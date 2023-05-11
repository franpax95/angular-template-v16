import { FileTypeResult, fromBuffer } from 'file-type/browser';
import { extension, lookup } from 'mime';

export const base64toBlob = (b64Data: string, contentType = '', sliceSize = 512): Blob => {
    const byteCharacters = Buffer.from(b64Data, 'base64');
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
    
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.at(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}


/**
 * Devuelve una promesa para transformar un File en un string base64
 * @param file 
 * @returns 
 */
export const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => (new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function() {
        resolve(reader.result);
    }

    reader.onerror = function(error) {
        reject(error);
    }
}));

/**
 * Devuelve una promesa para transformar un File en un string base64 reducido
 * @param file 
 * @param limit     longitud máxima del string en base64
 * @returns 
 */
export const fileToReducedBase64 = (file: File, limit: number) => (new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(event) {
        const image = new Image();
        
        image.onload = function() {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            
            const dimensions = resizeImage(image.width, image.height); //[width, height, ratio]
            const width = dimensions[0];
            const height = dimensions[1];
            let ratio = dimensions[2];
            
            canvas.width = width;
            canvas.height = height;
            
            context!.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                canvas.width,
                canvas.height
            );
            
            let result = canvas.toDataURL("image/jpeg", ratio);
            while (result.length > limit) {
                ratio = ratio / 2.5;
                result = canvas.toDataURL("image/jpeg", ratio);
            }
            resolve(result);
        }
        
        image.src = event.target!.result!.toString();
    }

    reader.onerror = function(error) {
        reject(error);
    }
}));

/**
 * Devuelve el comienzo del base64 para su display
 */
export const getBase64ContentType = async (b64: string): Promise<string> => {
    const info: { ext: string, mime: string } | undefined = await getBase64MimeInfo(b64);
    return info ? `data:${info.mime};base64,` : '';
}

/**
 * Devuelve la extensión y el content-type de un base64
 */
export const getBase64MimeInfo = (b64: string): Promise<FileTypeResult | undefined> => {
    const buffer = Buffer.from(b64, 'base64');
    return fromBuffer(buffer);
}

/**
 * Devuelve el Content Type a partir del tipo pasado por parámetro.
 * @param path Path del archivo o tipo de éste. P.e: 'pdf', 'file.pdf', '../src/file.pdf'...
 */
export const getMimeContentType = (path: string): string => {
    return lookup(path);
}

/**
 * Devuelve la extensión del archivo según su Content Type
 */
export const getMimeExtension = (contentType: string): string => {
    return extension(contentType) || '';
}

/**
 * Redimensiona la imagen para que no pase de HD, manteniendo su proporción ancho/altura
 * 
 * @param w     ancho (en px) de la imagen
 * @param h     alto (en px) de la imagen
 * @returns     array con las nuevas dimensiones: anchura, altura y relación entre las anteriores dimensiones y las nuevas, respectivamente
 */
export const resizeImage = (w: number, h: number) => {
    const hdWidth = 1920; //px
    const hdHeight = 1080; //px
    
    if (w > h) {
        const width = w < hdWidth ? w : hdWidth;
        const ratio = width / w;
        const height = h * ratio;
        return [width, height, ratio];
    }
    
    else {
        const height = h < hdHeight ? h : hdHeight;
        const ratio = height / h;
        const width = w * ratio;
        return [width, height, ratio];
    }
}

/**
 * Convierte un base64 en un objeto de tipo File
 * 
 * @param url           base64
 * @param filename      nombre del archivo
 * @param mimeType      application/pdf, image/jpeg, image/gif...
 * @returns             Promesa que devuelve un archivo File
 */
export const urlToFile = (url: string, filename: string, mimeType: string) => fetch(url)
    .then(function(res) {
        return res.arrayBuffer();
    })
    .then(function(buf) {
        return new File([buf], filename, { type: mimeType });
    });
