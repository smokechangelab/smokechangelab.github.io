export class FSM{
  constructor({initial='idle',transitions={},onChange=()=>{}}={}){this.state=initial;this.transitions=transitions;this.onChange=onChange}
  can(event){return Boolean(this.transitions[this.state]?.[event])}
  send(event,payload){const next=this.transitions[this.state]?.[event];if(!next)return false;const prev=this.state;this.state=typeof next==='function'?next(payload,this.state):next;this.onChange({prev,next:this.state,event,payload});return true}
}
export const FLOW_TRANSITIONS={
  idle:{START:'active'},active:{SUBMIT:'loading',SUCCESS:'success',FAIL:'error',CANCEL:'idle'},loading:{SUCCESS:'success',FAIL:'error'},success:{RESET:'idle',START:'active'},error:{RETRY:'active',RESET:'idle'}
};