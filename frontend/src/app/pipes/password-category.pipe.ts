import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordCategory'
})
export class PasswordCategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'work':
        return 'Work';
      case 'personal':
        return 'Personal';
      case 'social':
        return 'Social';
      default:
        return 'Other';
    }
  }
}
