const ensureFolderExists = async (token, folderName = "DevBook") => {
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${folderName}'&mimeType='application/vnd.google-apps.folder'&trashed=false&fields=files(id,name)`

    try {
        const searchResponse = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (!searchResponse.ok) {
            throw new Error(`Error searching for folder: ${searchResponse.statusText}`)
        }

        const searchResult = await searchResponse.json()

        if (searchResult.files && searchResult.files.length > 0) {
            console.log('Folder found:', searchResult.files[0])
            return searchResult.files[0].id
        } else {
            const metadata = {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
            }

            const createResponse = await fetch('https://www.googleapis.com/drive/v3/files', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(metadata),
            })

            if (!createResponse.ok) {
                throw new Error(`Error creating folder: ${createResponse.statusText}`)
            }

            const createResult = await createResponse.json()
            console.log('Folder created:', createResult)
            return createResult.id
        }
    } catch (error) {
        console.error('Error handling folder:', error)
        throw error
    }
}

const uploadFileToDrive = async (token, fileName, fileContent, folderId) => {
    try {
        const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${fileName}' and '${folderId}' in parents and trashed=false&fields=files(id,name)`;
        const searchResponse = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!searchResponse.ok) {
            throw new Error(`Error searching for file: ${searchResponse.statusText}`);
        }

        const searchResult = await searchResponse.json();

        if (searchResult.files && searchResult.files.length > 0) {
            const fileId = searchResult.files[0].id;
            const updateUrl = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`;

            const metadata = {
                name: fileName,
                mimeType: 'application/json',
            };

            const formData = new FormData();
            formData.append(
                'metadata',
                new Blob([JSON.stringify(metadata)], { type: 'application/json' })
            );
            formData.append('file', new Blob([fileContent], { type: 'application/json' }));

            const updateResponse = await fetch(updateUrl, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!updateResponse.ok) {
                throw new Error(`Error updating file: ${updateResponse.statusText}`);
            }

            const updateResult = await updateResponse.json();
            console.log('File updated successfully:', updateResult);
            return updateResult;
        } else {
            const metadata = {
                name: fileName,
                mimeType: 'application/json',
                parents: [folderId],
            };

            const formData = new FormData();
            formData.append(
                'metadata',
                new Blob([JSON.stringify(metadata)], { type: 'application/json' })
            );
            formData.append('file', new Blob([fileContent], { type: 'application/json' }));

            const createResponse = await fetch(
                'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (!createResponse.ok) {
                throw new Error(`Error uploading file: ${createResponse.statusText}`);
            }

            const createResult = await createResponse.json();
            console.log('File uploaded successfully:', createResult);
            return createResult;
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

const listFiles = async (token, folderId) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name)`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        if (!response.ok) {
            throw new Error(`Error listing files: ${response.statusText}`)
        }

        const result = await response.json()
        console.log('Files listed successfully:', result)

        const filesWithContent = await Promise.all(result.files.map(async (file) => {
            const contentResponse = await fetch(
                `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (!contentResponse.ok) {
                throw new Error(`Error fetching file content: ${contentResponse.statusText}`)
            }

            const content = await contentResponse.json()
            return { ...file, content }
        }))

        return filesWithContent
    } catch (error) {
        console.error('Error listing files:', error)
        throw error
    }
}

export { uploadFileToDrive, ensureFolderExists, listFiles }