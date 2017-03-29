import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulatorComponent } from './simulator/simulator.component';
import { VisualizerComponent } from './visualizer/visualizer.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Journey'
    },
    children: [
      {
        path: 'simulator',
        component: SimulatorComponent,
        data: {
          title: 'simulator'
        }
      },
      {
        path: 'visualizer',
        component: VisualizerComponent,
        data: {
          title: 'visualize'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneyRoutingModule {}
