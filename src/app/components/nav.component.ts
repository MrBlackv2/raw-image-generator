import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {

}