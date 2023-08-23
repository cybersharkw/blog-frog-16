import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

import { z } from 'zod';
import { Observable, map } from 'rxjs';

const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  contentPreview: z.string(),
  author: z.string(),
  likes: z.number(),
  comments: z.number(),
  likedByMe: z.boolean(),
  createdByMe: z.boolean(),
});

const CreatedBlogSchema = z.object({
  title: z.string(),
  contentPreview: z.string(),
  author: z.string(),
});

const BlogArraySchema = z.array(BlogSchema);

export type Blog = z.infer<typeof BlogSchema>;
export type CreatedBlog = z.infer<typeof CreatedBlogSchema>;

@Injectable({
  providedIn: 'root',
})
export class BlogDataService {
  constructor(private httpClient: HttpClient) {}

  getBlogPosts(): Observable<Blog[]> {
    return this.httpClient
      .get<Blog[]>(`${environment.serviceUrl}/entries`)
      .pipe(map((blogs) => BlogArraySchema.parse(blogs)));
  }

  addBlog(blog: CreatedBlog) {
    CreatedBlogSchema.parse(blog);
    return this.httpClient.post<void>(
      '${environment.serviceUrl}/entries',
      blog
    );
  }
}
