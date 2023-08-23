import { BlogDataService, CreatedBlog } from 'src/app/core/blog-data.service';
import { LoadingService } from 'src/app/core/loading-service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type BlogState = {
  error?: string;
};

@Injectable({
  providedIn: 'root',
})
export class BlogStateService {
  #state = new BehaviorSubject<BlogState>({ error: undefined });
  state$ = this.#state.asObservable();

  constructor(
    private blogDataService: BlogDataService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  async addBlog(blog: CreatedBlog) {
    this.#state.next({ error: undefined });
    this.loadingService.setLoadingState(true);

    try {
      await this.blogDataService.addBlog(blog);
      this.router.navigate(['/overview']);
    } catch (error) {
      this.#state.next({
        error: (error as Error).message,
      });
    } finally {
      this.loadingService.setLoadingState(false);
    }
  }
}
