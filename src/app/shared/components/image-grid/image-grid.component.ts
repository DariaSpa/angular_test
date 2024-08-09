import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent {
  @Input() images: string[];
  @Input() icon: string;
  @Input() isLoading: boolean = false;
  @Output() imageClick: EventEmitter<string> = new EventEmitter<string>();

  imageClicked(image: string): void {
    this.imageClick.emit(image);
  }
}
