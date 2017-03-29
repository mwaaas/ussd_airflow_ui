import { Component, ElementRef, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements AfterViewInit {
  name = 'GoJS';

  @ViewChild('ussdJourney')
  element: ElementRef;
  constructor() { }

  ngAfterViewInit() {
    // (go as any).licenseKey = "...";

    const $ = go.GraphObject.make;  // for conciseness in defining templates

    const ussdJourney = $(go.Diagram, this.element.nativeElement,
        {
            minScale: 0.1,
            grid: $(go.Panel, 'Grid',
                $(go.Shape, 'LineH', {stroke: 'gray', strokeWidth: 0.5}),
                $(go.Shape, 'LineH', {stroke: 'darkslategray', strokeWidth: 1.5, interval: 10}),
                $(go.Shape, 'LineV', {stroke: 'gray', strokeWidth: 0.5}),
                $(go.Shape, 'LineV', {stroke: 'darkslategray', strokeWidth: 1.5, interval: 10})
            ),
            initialContentAlignment: go.Spot.Left,
            'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
            'textEditingTool.starting': go.TextEditingTool.SingleClick,
            'draggingTool.isGridSnapEnabled': true,
            'undoManager.isEnabled': true
        });
    // define a simple Node template
    ussdJourney.nodeTemplate =
      $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 },
          // Shape.fill is bound to Node.data.color
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { margin: 8 },  // some room around the text
          // TextBlock.text is bound to Node.data.key
          new go.Binding('text', 'key'))
      );

    // but use the default Link template, by not setting Diagram.linkTemplate

    // create the model data that will be represented by Nodes and Links
    ussdJourney.model = new go.GraphLinksModel(
      [
        {key: '1', title: 'initial_screen', items: [{index: 1, portName: 'out1', text: 'Enter name'}]},
        {key: '2', title: 'welcome_screen', items: [{index: 1, portName: 'out1', text: 'Enter date of birth'}]}
    ],
      [
        {from : '1', to: '2', fromPort: 'out1'}
      ]);
  }

}
