import { Component } from '@angular/core';
import { RowComponent } from '../row/row.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    standalone: true,
    imports: [RowComponent]
})
export class ListComponent {

}
