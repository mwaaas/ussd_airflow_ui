import { Component, ElementRef, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
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
  constructor(public http: Http) { }

  ngAfterViewInit() {
    // (go as any).licenseKey = "...";

    const $ = go.GraphObject.make;  // for conciseness in defining templates

    const ussdJourney = $(go.Diagram, this.element.nativeElement,
        {
            minScale: 0.1,
            initialContentAlignment: go.Spot.TopLeft,
        });
    ussdJourney.layout = $(go.LayeredDigraphLayout,
      {columnSpacing: 15, layerSpacing: 10, packOption: 4,
        layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource,
        initializeOption: go.LayeredDigraphLayout.InitDepthFirstOut,
        aggressiveOption: go.LayeredDigraphLayout.AggressiveMore,
        cycleRemoveOption: go.LayeredDigraphLayout.CycleDepthFirst,
      });
    // ussdJourney.linkTemplate = $(go.Link, {
    //     routing: go.Link.Orthogonal, corner: 0,
    //     curve: go.Link.JumpOver
    //   },
    //   $(go.Shape, {strokeWidth: 3, stroke: '#555'}),
    //   $(go.Shape, {toArrow: 'Standard', stroke: null}));
    ussdJourney.nodeTemplate =
        $(go.Node, 'Vertical',
            {
                background: 'black', toSpot: go.Spot.Left, portId: 'IN',
                name: 'Screen'
            },
            $(go.Panel, 'Auto',
                {},
                $(go.Shape, 'RoundedRectangle',
                    {fill: '#EFEFEF'}),
                $(go.Panel, 'Vertical',
                    $(go.TextBlock, 'Screen',
                        {},
                        new go.Binding('text', 'key', function (arg) {
                            return 'Screen ' + arg;
                        })),
                    $(go.Panel, 'Auto', {alignment: go.Spot.Center},
                        $(go.Shape, 'RoundedRectangle',
                            {fill: 'white', width: 242}),
                        $(go.TextBlock, '',
                            {width: 230, font: 'normal 18px san-serif', wrap: go.TextBlock.WrapFit},
                            new go.Binding('text', 'title')
                        )
                    ),
                    $(go.Panel, 'Vertical',
                        new go.Binding('itemArray', 'items'),
                        {
                            itemTemplate: $(go.Panel, 'Horizontal',
                                {margin: 1},
                                $(go.Panel, 'Spot',
                                    $(go.Shape, 'Rectangle',
                                        {height: 50, width: 300, fill: '#EFEFEF', stroke: null}),
                                    $(go.TextBlock,
                                        {
                                            margin: 2,
                                            alignment: new go.Spot(0.04, 0.5),
                                            alignmentFocus: new go.Spot(0, 0.5),
                                            width: 10,
                                            name: 'ObjectIndex'
                                        },
                                        new go.Binding('text', 'index')),
                                    $(go.Panel, 'Auto',
                                        {alignment: go.Spot.Center},
                                        $(go.Shape, 'RoundedRectangle',
                                            {fill: '#FFFFFF', width: 242},
                                        ),
                                        $(go.TextBlock,
                                            {
                                                background: '#FFFFFF',
                                                width: 230,
                                                font: 'normal 18px san-serif',
                                                wrap: go.TextBlock.WrapFit
                                            },
                                            new go.Binding('text')))
                                ))
                        })
                ))
        );

    // but use the default Link template, by not setting Diagram.linkTemplate

    const model = $(go.GraphLinksModel);

    model.linkFromPortIdProperty = 'previous_screen';
    model.linkToPortIdProperty = 'next_screen';

    // get customer journey
    const journey = this.get_customer_journey().subscribe(
      response => {
        console.log(response.json());
        model.nodeDataArray = response.json()['data'];
        model.linkDataArray = response.json()['links'];
        },
      error => {
        console.log('error');
        console.log(error.json());
      }
    );

    // model.nodeDataArray =
    // [
    // {key: '1', title: 'initial_screen', items: [{index: 1, portName: 'out1', text: 'Enter name'}]},
    // {key: '2', title: 'welcome_screen', items: [{index: 1, portName: 'out1', text: 'Enter date of birth'}]}
    // ];
    // model.linkDataArray = [
    // {from : '1', to: '2'}
    // ];
    ussdJourney.model  = model;
  }

  get_customer_journey() {
    // const url = 'http://ussd.com/journey_visual_data';
    const url = 'http://app.inclusivity.48a584e2.svc.dockerapp.io:8006/journey_visual_data';
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    // headers.append('Origin', '*');
    return this.http.get(url, {headers: headers});
  }

}
