import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent {
  @Input() url: string = '';
  @Input() icon: string = 'add';
  @Output() imageClick = new EventEmitter<void>();

  onClick(): void {
    this.imageClick.emit();
  }
}
