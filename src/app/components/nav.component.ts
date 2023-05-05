import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  imports: [RouterModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {

}