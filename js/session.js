export class SessionGuard{
  constructor(){this.dirty=false;this.modalOpen=false;this.onBack=null;history.replaceState({app:true,depth:0},'',location.href);window.addEventListener('popstate',()=>{if(this.modalOpen||this.dirty){history.pushState({app:true,depth:1},'',location.href);this.onBack?.();return}this.onBack?.()});window.addEventListener('beforeunload',e=>{if(!this.dirty)return;e.preventDefault();e.returnValue=''})}
  markDirty(v=true){this.dirty=v}
  setModal(v){this.modalOpen=v}
  push(view){history.pushState({app:true,view},'',`#${view}`)}
}