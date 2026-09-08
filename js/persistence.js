const KEY='smokeLab.v1';
export const clone=x=>typeof structuredClone==='function'?structuredClone(x):JSON.parse(JSON.stringify(x));
export function loadState(fallback){try{const raw=localStorage.getItem(KEY);return raw?{...fallback,...JSON.parse(raw)}:clone(fallback)}catch{return clone(fallback)}}
export function saveState(state){localStorage.setItem(KEY,JSON.stringify(state));}
export function transactionalUpdate(stateRef,mutator,validate=()=>true){const before=clone(stateRef.current),draft=clone(before);mutator(draft);stateRef.current=draft;saveState(draft);if(!validate(draft)){stateRef.current=before;saveState(before);return{ok:false,state:before}}return{ok:true,state:draft}}
export function clearState(){localStorage.removeItem(KEY);localStorage.removeItem('experiment_progress_today')}