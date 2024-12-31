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
    const metadata = {
        name: fileName,
        mimeType: 'application/json',
        parents: [folderId],
    }

    const formData = new FormData()
    formData.append(
        'metadata',
        new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    )
    formData.append('file', new Blob([fileContent], { type: 'application/json' }))

    try {
        const response = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        )

        if (!response.ok) {
            throw new Error(`Error uploading file: ${response.statusText}`)
        }

        const result = await response.json()
        console.log('File uploaded successfully:', result)
        return result
    } catch (error) {
        throw error
    }
}

export { uploadFileToDrive, ensureFolderExists }