import {Component, animate, style, state, transition, trigger} from '@angular/core';

@Component({
  selector: 'my-app',
  providers: [],
  animations: [
    trigger("fadeInOut", [
      state("open", style({opacity: 1})),
      state("closed", style({opacity: 0})),
      transition("open <=> closed", animate( "3000ms" )),
    ])
  ],
  template: 
  `
  <h1> Angular 2 Animation State Transition Test </h1>
  
  <p> Trying to replicate old animation API behaviour of animationBuilder.css().setToFromStyles() etc </p>
  <p> The old animations API used to play from CURRENT style. Now it starts from beginning of state. </p>
  <p> i.e. A state transition of 'open' -> 'closed' -> 'open' before the 'closed' animation completed<br/> would result in
      a FULL 'closed' to 'open' transition instead of a PARTIAL transition (from whatever css <br/>styles were currently applied 
      at the time of when the second 'open' state transition occurred.</p>
  
  <h3> As of RC3 I can't figure this out with the new API syntax. </h3>
  <h4> Instructions:</h4>
  <ul>
  <li> Click 'Toggle State' to fade out the component over 3 seconds (i.e. change state to 'closed')</li>
  <li> Click 'Toggle State' again after ~1.5 seconds, i.e. change state back to 'open'</li>
  <li> <b>Expect:</b> Nice fadeout/fadein from {opacity: 1} to {opacity: 0.5} back to {opacity: 1}</li>
  <li> <b>Actual Result:</b> Fadeout for 1.5s then harsh fadein from 0 opacity</li>
  </ul>
    <p>
      <a (click)="beginAnim()">Toggle State</a>
    </p>
    
    <div class="dummyComponent" @fadeInOut="state">
      
    </div>
    
    <br/>
    <div>Current State: <b>{{state}}</b></div>
  `
})
export class AppComponent {
  state = 'open';
  timeOutRef: any;

  beginAnim() {
     // toggle state to kickstart animation
      this.state = this.state === 'open' ? 'closed' : 'open';
  }
}
