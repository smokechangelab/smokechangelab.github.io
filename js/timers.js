export class RafTimer{
  constructor({duration,onTick,onDone}){this.duration=duration;this.onTick=onTick;this.onDone=onDone;this.running=false;this.startAt=0;this.endAt=0;this.raf=0}
  start(){this.running=true;this.startAt=Date.now();this.endAt=this.startAt+this.duration;const loop=()=>{if(!this.running)return;const now=Date.now(),remain=Math.max(0,this.endAt-now),progress=Math.min(1,(now-this.startAt)/this.duration);this.onTick?.({remain,progress,now});if(remain<=0){this.running=false;this.onDone?.();return}this.raf=requestAnimationFrame(loop)};loop()}
  stop(){this.running=false;cancelAnimationFrame(this.raf)}
}
export function breathPhase(elapsedMs){const cycle=19000,t=elapsedMs%cycle;if(t<4000)return{key:'inhale',label:'Einatmen',left:4000-t};if(t<11000)return{key:'hold',label:'Halten',left:11000-t};return{key:'exhale',label:'Ausatmen',left:19000-t}}
