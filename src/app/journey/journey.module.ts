import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from './simulator/simulator.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import {JourneyRoutingModule} from './journey-routing.module';

@NgModule({
  imports: [
    CommonModule,
    JourneyRoutingModule
  ],
  declarations: [SimulatorComponent, VisualizerComponent]
})
export class JourneyModule { }
