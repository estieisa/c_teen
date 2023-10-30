export const uploadFileToStorage  = async(file:any, reqFile:any)=>{
    return new Promise((resolve, reject) => {
        const stream = file.createWriteStream({
          metadata: {
            contentType: reqFile.mimetype,
          },
          public: true,
          validation: 'md5',
        });
    
        stream.on('error', (error:Error) => {
          reject(error);
        });
    
        stream.on('finish', () => {
          const downloadURL = file.publicUrl();
          resolve(downloadURL);
        });
    
        stream.end(reqFile.buffer);
      });
  }
  