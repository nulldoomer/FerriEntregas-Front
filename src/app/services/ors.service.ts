import { Injectable } from '@angular/core';

declare var Tesseract: any;

@Injectable({
  providedIn: 'root',
})
export class OcrService {
  constructor() {}

  // Método para realizar OCR en una imagen
  recognizeText(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(
        imageUrl,
        'spa',
        {
          logger: (m: any) => {
            console.log(m); // Muestra el progreso y el estado de cada paso
            if (m.status === 'recognizing text') {
              console.log('Reconociendo texto:', m.progress);
            }
          },
        }
      ).then(({ data: { text } }: { data: { text: string } }) => {
        console.log('Texto completo extraído:', text); // Aquí imprimes el texto completo
        if (!text.trim()) {
          throw new Error('OCR no pudo extraer texto');
        }
        resolve(text);
      }).catch((err: any) => {
        console.error('Error durante OCR:', err);
        reject(err);
      });
    });
  }
}
