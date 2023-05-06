import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Txt2ImageOptions } from '../types/txt-2-image-options';

@Injectable({
  providedIn: 'root'
})
export class SdClientService {
  private http = inject(HttpClient);

  txt2img({ prompt, options }: { prompt: string, negativePrompt?: string, options?: Txt2ImageOptions }) {
    const orientation = options?.orientation ?? 'portrait';

    return this.http.post<{ images: string[] }>(`${environment.api.hostname}/api/v1/txt2img`, {
      prompt: prompt,
      orientation
    }, {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
