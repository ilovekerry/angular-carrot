import { Pipe, PipeTransform } from '@angular/core';
import { ArticleListTypeOptions, ArticleListStatusOptions } from './constant';

@Pipe({name: 'articleListType'})
export class ArticleListTypePipe implements PipeTransform {
  transform(value: number): string {
    let name: string;
    ArticleListTypeOptions.forEach(function(item, index, array) {
      if (item.id === String(value)) {
        name = item.name;
      }
    });
    return name;
  }
}
@Pipe({name: 'articleListStatus'})
export class ArticleListStatusPipe implements PipeTransform {
  transform(value: number): string {
    let name: string;
    ArticleListStatusOptions.forEach(function(item, index, array) {
      if (item.id === String(value)) {
        name = item.name;
      }
    });
    return name;
  }
}
@Pipe({name: 'imageSize'})
export class ImageSizePipe implements PipeTransform {
  transform(value: number): number {
    if (value < 0.01) {
      value = 0.01;
    }
    return value;
  }
}

