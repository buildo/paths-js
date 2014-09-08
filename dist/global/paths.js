(function(){var e=function(){var e,t,n,r,i,s,o,u,a,f,l;return a=function(e){return e.reduce(function(e,t){return e+t},0)},i=function(e){return e.reduce(function(e,t){return Math.min(e,t)})},r=function(e){return e.reduce(function(e,t){return Math.max(e,t)})},u=function(e,t){var n,r,i,s;return n=e[0],r=e[1],i=t[0],s=t[1],[n+i,r+s]},s=function(e,t){var n,r,i,s;return n=e[0],r=e[1],i=t[0],s=t[1],[n-i,r-s]},l=function(e,t){var n,r;return n=t[0],r=t[1],[e*n,e*r]},n=function(e){var t,n;return t=e[0],n=e[1],Math.sqrt(t*t+n*n)},f=function(e){return e.reduce(function(e,t){return u(e,t)},[0,0])},e=function(e){return l(1/e.length,e.reduce(u))},o=function(e,t){return l(e,[Math.sin(t),-Math.cos(t)])},t=function(e,t){var n,r,i;i=e||{};for(n in i)r=i[n],t[n]=r(t.index,t.item);return t},{sum:a,min:i,max:r,plus:u,minus:s,times:l,length:n,sum_vectors:f,average:e,on_circle:o,enhance:t}}(),t=function(){return function(e,t){var n,r,i,s;return n=e[0],r=e[1],i=t[0],s=t[1],function(e){return i+(s-i)*(e-n)/(r-n)}}}(),n=function(){var e;return e=function(t){var n,r,i,s,o,u,a;return r=t||[],u=function(e,t){var n;return n=e.slice(0,e.length),n.push(t),n},n=function(e,t){return e[0]===t[0]&&e[1]===t[1]},o=function(e){var t,n;return t=e.command,n=e.params,""+t+" "+n.join(" ")},s=function(e,t){var n,r,i,s;n=e.command,r=e.params,i=t[0],s=t[1];switch(n){case"M":return[r[0],r[1]];case"L":return[r[0],r[1]];case"H":return[r[0],s];case"V":return[i,r[0]];case"Z":return null;case"C":return[r[4],r[5]];case"S":return[r[2],r[3]];case"Q":return[r[2],r[3]];case"T":return[r[0],r[1]];case"A":return[r[5],r[6]]}},a=function(e,t){return function(n){var r;return r=typeof n=="object"?e.map(function(e){return n[e]}):arguments,t.apply(null,r)}},i=function(t){return e(u(r,t))},{moveto:a(["x","y"],function(e,t){return i({command:"M",params:[e,t]})}),lineto:a(["x","y"],function(e,t){return i({command:"L",params:[e,t]})}),hlineto:a(["x"],function(e){return i({command:"H",params:[e]})}),vlineto:a(["y"],function(e){return i({command:"V",params:[e]})}),closepath:function(){return i({command:"Z",params:[]})},curveto:a(["x1","y1","x2","y2","x","y"],function(e,t,n,r,s,o){return i({command:"C",params:[e,t,n,r,s,o]})}),smoothcurveto:a(["x2","y2","x","y"],function(e,t,n,r){return i({command:"S",params:[e,t,n,r]})}),qcurveto:a(["x1","y1","x","y"],function(e,t,n,r){return i({command:"Q",params:[e,t,n,r]})}),smoothqcurveto:a(["x","y"],function(e,t){return i({command:"T",params:[e,t]})}),arc:a(["rx","ry","xrot","large_arc_flag","sweep_flag","x","y"],function(e,t,n,r,s,o,u){return i({command:"A",params:[e,t,n,r,s,o,u]})}),print:function(){return r.map(o).join(" ")},points:function(){var e,t,n,i,o,u;n=[],t=[0,0],i=function(){var r;r=s(e,t),t=r;if(r)return n.push(r)};for(o=0,u=r.length;o<u;o++)e=r[o],i();return n},instructions:function(){return r.slice(0,r.length)},connect:function(t){var r,i,s;return i=this.points().slice(-1)[0],r=t.points()[0],s=t.instructions().slice(1),n(i,r)||s.unshift({command:"L",params:r}),s.reduce(function(t,n){return e(u(t.instructions(),n))},this)}}},function(){return e()}}(),r=function(e,t){return function(n){var r,i,s,o,u,a,f;return u=n.points,r=n.closed,s=u.length,i=u[0],a=u.slice(1,+s+1||9e9),o=a.reduce(function(e,t){return e.lineto.apply(e,t)},(f=e()).moveto.apply(f,i)),{path:r?o.closepath():o,centroid:t.average(u)}}}(n,e),i=function(e){return function(t){var n,r,i,s;return r=t.left,i=t.right,s=t.top,n=t.bottom,e({points:[[i,s],[i,n],[r,n],[r,s]],closed:!0})}}(r),s=function(){var e;return e=function(e,t){var n,r,i,s,o,u,a;r=t>=1?Math.floor(e[0]):e[0],n=t>=1?Math.ceil(e[1]):e[1],s=r===e[0]?r:r+t,i=n===e[1]?n:n-t,a=[];for(o=u=s;t>0?u<=i:u>=i;o=u+=t)a.push(o);return a},{step:e,steps:function(t,n){var r;return r=(t[1]-t[0])/(n+1),e(t,r>1?Math.round(r):r)}}}(),o=function(e,t,n,r){return function(i){var s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,M,_,D,P,H,B,j,F,I,q,R,U,z,W,X,V,$,J;c=i.data,s=i.accessor,P=i.width,g=i.height,m=i.gutter,a=i.compute,A=i.stacked,o=i.axes,s==null&&(s=function(e){return e}),m==null&&(m=0),v=[],x=0,S=0;for(y=j=0,R=c.length;j<R;y=++j){l=c[y];for(b=F=0,U=l.length;F<U;b=++F)h=l[b],_=s(h),_<x&&(x=_),_>S&&(S=_),v[b]==null&&(v[b]=[]),v[b][y]=_}T=v.length,d=(P-m*(T-1))/T,f=[],C=t([x,S],[g,0]);for(y=I=0,z=v.length;I<z;y=++I){p=v[y],D=A?d:d/p.length,k=(d+m)*y,L=p.map(function(e,t){return{original_index:t,value:e}}),A&&L.sort(function(e,t){return s(e.value)<s(t.value)?1:s(t.value)<s(e.value)?-1:0});for(b=q=0,W=L.length;q<W;b=++q)h=L[b],w=k+(A?0:D*b),N=w+D,u=C(0),M=C(h.value),E=n({left:w,right:N,bottom:u,top:M}),f.push(e.enhance(a,{item:c[h.original_index][y],line:E,index:h.original_index}))}return B=[(o!=null?(X=o.y)!=null?X.min:void 0:void 0)||x,(o!=null?(V=o.y)!=null?V.max:void 0:void 0)||S],H=(o!=null?($=o.y)!=null?$.steps:void 0:void 0)!=null?r.steps(B,o.y.steps):(o!=null?o.y:void 0)!=null?r.step(B,(o!=null?(J=o.y)!=null?J.step:void 0:void 0)||1):void 0,{curves:f,scale:C,y:H?H.map(function(e){return{position:e,value:e}}):void 0}}}(e,t,i,s),u=function(e,t){var n;return n=function(e,n){return t.minus(t.times(2,e),n)},function(r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S;p=r.points,d=r.tension,d==null&&(d=.3),u=[],f=p.length;for(a=v=1,y=f-1;1<=y?v<=y:v>=y;a=1<=y?++v:--v)u.push(t.times(d,t.minus(p[a],p[a-1])));o=[t.plus(p[0],n(u[0],u[1]))];for(a=m=1,b=f-2;1<=b?m<=b:m>=b;a=1<=b?++m:--m)o.push(t.minus(p[a],t.average([u[a],u[a-1]])));return o.push(t.minus(p[f-1],n(u[f-2],u[f-3]))),i=o[0],s=o[1],l=p[0],c=p[1],h=(w=e()).moveto.apply(w,l).curveto(i[0],i[1],s[0],s[1],c[0],c[1]),{path:function(){S=[];for(var e=2,t=f-1;2<=t?e<=t:e>=t;2<=t?e++:e--)S.push(e);return S}.apply(this).reduce(function(e,t){var n,r;return n=o[t],r=p[t],e.smoothcurveto(n[0],n[1],r[0],r[1])},h),centroid:t.average(p)}}}(n,e),a=function(e,t){return function(n){var r,i,s,o,u,a,f,l,c,h,p,d,v;return c=n.start,u=n.end,h=n.tension,h==null&&(h=.05),r=c[0],i=c[1],s=u[0],o=u[1],a=(s-r)*h,f=[r+a,i],l=[s-a,o],{path:(p=(d=(v=e()).moveto.apply(v,c)).lineto.apply(d,f).curveto(r+5*a,i,s-5*a,o,s-a,o)).lineto.apply(p,u),centroid:t.average([c,u])}}}(n,e),f=function(e,t,n){return function(e){var r,i,s,o,u,a,f,l;return f=e.topleft,l=e.topright,i=e.bottomleft,s=e.bottomright,a=t({start:f,end:l}).path,r=t({start:s,end:i}).path,u=a.connect(r).closepath(),o=n.average([f,l,i,s]),{path:u,centroid:o}}}(n,a,e),l=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p;return n=function(t,n){var r,i;return r=t.mass+n.mass,i=e.times(1/r,e.plus(e.times(t.mass,t.point),e.times(n.mass,n.point))),[i,r]},o=function(e,t){var n,r,i,s,o,u,a,f,l,c;u=e[0],a=e[1];for(f=0,l=t.length;f<l;f++){i=t[f],c=i.box,o=c.top,n=c.bottom,r=c.left,s=c.right;if(r<=u&&u<=s&&n<=a&&a<=o)return i}},a=function(e,t){var n,r,i,s,o,u,a,f;return f=e.top,i=e.bottom,u=e.left,a=e.right,n=t[0],r=t[1],o=(u+a)/2,s=(f+i)/2,{box:{top:r?s:f,bottom:r?i:s,left:n?o:u,right:n?a:o}}},h=function(e){var t;return t=e.box,[a(t,[0,0]),a(t,[1,0]),a(t,[0,1]),a(t,[1,1])]},t=function(e,r){var i,s,u;return e.body?(s=e.body,delete e.body,e.children=h(e),t(e,s),t(e,r)):e.children?(i=o(r.point,e.children),u=e.point?n(e,r):[r.point,r.mass],e.point=u[0],e.mass=u[1],t(i,r)):e.body=r},l=function(e,n){var r;return e.length===0?n:(r=e.shift(),t(n,r),l(e,n))},u=function(e){var t,n,r;t=[];for(n in e)r=e[n],t.push({id:n,point:r,mass:1});return t},f=function(e,t){return{box:{top:t,bottom:0,left:0,right:e}}},p=function(e,t){var n,r,i,s,o;if(e.body)return t(e);if(e.children){s=e.children,o=[];for(r=0,i=s.length;r<i;r++)n=s[r],o.push(p(n,t));return o}},r=function(t,n,r){var i,s;return s=e.minus(t.point,n.point),i=e.length(s),e.times(r*t.mass*n.mass/(i*i*i),s)},i=function(t){var n,r,i,s;return s=t.top,n=t.bottom,r=t.left,i=t.right,e.length([s-n,i-r])},s=function(t,n,o,u){var a,f;return n===t?[0,0]:n.body?r(t.body,n.body,o):n.point?(f=i(n.box),a=e.length(e.minus(t.body.point,n.point)),f/a<u?r(t.body,n,o):e.sum_vectors(n.children.map(function(e){return s(t,e,o,u)}))):[0,0]},c=function(e,t,n){var r;return r={},p(e,function(i){return r[i.body.id]=s(i,e,t,n)}),r},{tree:l,bodies:u,root:f,forces:c}}(e),c=function(e,t,n){var r,i,s,o,u;return u=function(e,t){return[Math.random()*e,Math.random()*t]},i=function(e,t){return Math.min(Math.max(t,0),e)},s=function(e,t){return function(n){var r,s;return r=n[0],s=n[1],[i(e,r),i(t,s)]}},o=function(e,t){var n,r,i;r=[];for(n in e)i=e[n],r.push(t(n,i));return r},r=function(e,n,r){var i,s,o,u,a,f,l,c,h;o={};for(u in e)h=e[u],l=h.start,i=h.end,c=h.weight,a=n[l],f=n[i],s=t.times(r*c,t.minus(a,f)),o[l]==null&&(o[l]=[0,0]),o[i]==null&&(o[i]=[0,0]),o[l]=t.minus(o[l],s),o[i]=t.plus(o[i],s);return o},function(i){var a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,M,_,D,P,H,B,j,F,I;h=i.data,S=i.nodeaccessor,y=i.linkaccessor,P=i.width,v=i.height,a=i.attraction,k=i.repulsion,A=i.threshold,S==null&&(S=function(e){return e}),y==null&&(y=function(e){return e}),a==null&&(a=1),k==null&&(k=1),A==null&&(A=.5),f=s(P,v),x=h.nodes,b=h.links,c=h.constraints,c==null&&(c={}),N={},T={};for(H=0,j=x.length;H<j;H++)E=x[H],m=S(E),N[m]=c[m]||u(P,v),T[m]=E;w={};for(B=0,F=b.length;B<F;B++)g=b[B],I=y(g),L=I.start,p=I.end,D=I.weight,w[""+L+"|"+p]={weight:D,start:L,end:p,link:g};return M=function(){var e,i,s,o,u,l,h,p,d;i=n.bodies(N),p=n.root(P,v),d=n.tree(i,p),e=r(w,N,a/1e3),h=n.forces(d,k*1e3,A);for(m in N)l=N[m],c[m]?N[m]=c[m]:(o=e[m]||[0,0],u=h[m]||[0,0],s=t.plus(o,u),N[m]=f(t.plus(l,s)));return C()},l=function(e,t){return c[e]=t},_=function(e){return delete c[e]},d={tick:M,constrain:l,unconstrain:_},C=function(){var t;return t=-1,d.curves=o(w,function(n,r){var i,s,o,u,a;return a=r.start,i=r.end,s=r.link,t+=1,o=N[a],u=N[i],{link:e({points:[o,u],closed:!1}),item:s,index:t}}),d.nodes=o(T,function(e,t){return{point:N[e],item:t}}),d},C()}}(r,e,l),h=[].slice,p=function(e,t){return function(n){var r,i,s,o,u,a,f,l,c,p,d,v,m,g,y,b,w,E;return u=n.center,m=n.r,r=n.R,g=n.start,l=n.end,i=t.plus(u,t.on_circle(r,g)),s=t.plus(u,t.on_circle(r,l)),o=t.plus(u,t.on_circle(m,l)),f=t.plus(u,t.on_circle(m,g)),c=l-g>Math.PI?1:0,v=(y=(b=(w=(E=e()).moveto.apply(E,i)).arc.apply(w,[r,r,0,c,1].concat(h.call(s)))).lineto.apply(b,o)).arc.apply(y,[m,m,0,c,0].concat(h.call(f))).closepath(),p=(g+l)/2,d=(m+r)/2,a=t.plus(u,t.on_circle(d,p)),{path:v,centroid:a}}}(n,e),d=function(e,t,n){return function(r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b;f=r.data,s=r.accessor,o=r.center,h=r.r,i=r.R,u=r.compute,g=function(){var e,t,n;n=[];for(e=0,t=f.length;e<t;e++)c=f[e],n.push(s(c));return n}(),p=t.sum(g),d=e([0,p],[0,2*Math.PI]),a=[],v=0;for(l=y=0,b=f.length;y<b;l=++y)c=f[l],m=g[l],a.push(t.enhance(u,{item:c,index:l,sector:n({center:o,r:h,R:i,start:d(v),end:d(v+m)})})),v+=m;return{curves:a}}}(t,e,p),v=function(e,t){return function(n){var r,i,s,o;return i=n.center,o=n.radii,r=2*Math.PI/o.length,s=o.map(function(e,n){return t.plus(i,t.on_circle(e,n*r))}),e({points:s,closed:!0})}}(r,e),m=function(e,t){var n,r,i;return n=function(e){var t,n,r,i,s,o,u,a,f,l;n=[],r=function(){var t,n,r;r=[];for(t=0,n=e.length;t<n;t++)i=e[t],r.push(Object.keys(i));return r}();for(o=0,a=e.length;o<a;o++){s=e[o],l=Object.keys(s);for(u=0,f=l.length;u<f;u++)t=l[u],n.indexOf(t)===-1&&n.push(t)}return n},i=function(e){var t,n,r,i,s;t={},r=function(e){return t[e]=function(t){return t[e]}};for(i=0,s=e.length;i<s;i++)n=e[i],r(n);return t},r=function(e,n){var r,i;return r=Object.keys(n),i=e.map(function(e){var i;return i=r.map(function(t){return n[t](e)}),t.max(i)}),t.max(i)},function(s){var o,u,a,f,l,c,h,p,d,v,m,g,y,b,w;return l=s.data,o=s.accessor,a=s.center,v=s.r,p=s.max,g=s.rings,f=s.compute,g==null&&(g=3),o==null&&(o=i(n(l))),h=Object.keys(o),y=h.length,u=2*Math.PI/y,c=-1,p==null&&(p=r(l,o)),m=function(){w=[];for(var e=1;1<=g?e<=g:e>=g;1<=g?e++:e--)w.push(e);return w}.apply(this).map(function(t){var n,r,i,s;return n=v*t/g,e({center:a,radii:function(){s=[];for(var e=0,t=y-1;0<=t?e<=t:e>=t;0<=t?e++:e--)s.push(e);return s}.apply(this).map(function(e){return n})})}),d=l.map(function(n){return c+=1,t.enhance(f,{polygon:e({center:a,radii:h.map(function(e){return v*o[e](n)/p})}),item:n,index:c})}),{curves:d,rings:m}}}(v,e),g=function(e,t){var n;return n=function(e,n){var r,i,s,o,u;return s=function(){var t,i,s;s=[];for(t=0,i=e.length;t<i;t++)r=e[t],s.push(n(r));return s}(),o=s.sort(function(e,t){var n,r,i,s;return n=e[0],r=e[1],i=t[0],s=t[1],n-i}),u=o.map(function(e){return e[1]}),i=o.length,{points:o,xmin:o[0][0],xmax:o[i-1][0],ymin:t.min(u),ymax:t.max(u)}},function(r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A;return a=r.data,y=r.xaccessor,S=r.yaccessor,g=r.width,v=r.height,u=r.closed,s=r.axes,y==null&&(y=function(e){var t,n;return t=e[0],n=e[1],t}),S==null&&(S=function(e){var t,n;return t=e[0],n=e[1],n}),d=function(e){return[y(e),S(e)]},i=function(){var e,t,r;r=[];for(e=0,t=a.length;e<t;e++)p=a[e],r.push(n(p,d));return r}(),l=t.min(i.map(function(e){return e.xmin})),w=(s!=null?(C=s.x)!=null?C.min:void 0:void 0)!=null?Math.min(s.x.min,l):l,f=t.max(i.map(function(e){return e.xmax})),b=(s!=null?(k=s.x)!=null?k.max:void 0:void 0)!=null?Math.max(s.x.max,f):f,h=t.min(i.map(function(e){return e.ymin})),T=(s!=null?(L=s.y)!=null?L.min:void 0:void 0)!=null?Math.min(s.y.min,h):h,c=t.max(i.map(function(e){return e.ymax})),x=(s!=null?(A=s.y)!=null?A.max:void 0:void 0)!=null?Math.max(s.y.max,c):c,u&&(T=Math.min(T,0),x=Math.max(x,0)),o=u?0:T,E=e([w,b],[0,g]),N=e([T,x],[v,0]),m=function(e){var t,n;return t=e[0],n=e[1],[E(t),N(n)]},{arranged:i,scale:m,xscale:E,yscale:N,base:o,ymax:x}}}(t,e),y=function(e,t,n,r){return function(i){var s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k;return w=n(i),s=w.arranged,h=w.scale,v=w.xscale,b=w.yscale,u=w.base,y=w.ymax,E=[Infinity,-Infinity],c=E[0],l=E[1],a=-1,f=s.map(function(n){var r,s,o,f,p,d,v,m,g;return o=n.points,d=n.xmin,p=n.xmax,((v=i.axes)!=null?v.x:void 0)!=null&&(l<p&&(l=p),c>d&&(c=d)),f=o.map(h),a+=1,s=e({points:f}),r={path:(m=(g=s.path).lineto.apply(g,h([p,u]))).lineto.apply(m,h([d,u])).closepath(),centroid:t.average([s.centroid,h([d,u]),h([p,u])])},t.enhance(i.compute,{item:i.data[a],line:s,area:r,index:a})}),o=i.axes,g=[(o!=null?(S=o.y)!=null?S.min:void 0:void 0)||u,(o!=null?(x=o.y)!=null?x.max:void 0:void 0)||y],m=(o!=null?(T=o.y)!=null?T.steps:void 0:void 0)!=null?r.steps(g,o.y.steps):(o!=null?o.y:void 0)!=null?r.step(g,o.y.step||1):void 0,d=[(o!=null?(N=o.x)!=null?N.min:void 0:void 0)||c,(o!=null?(C=o.x)!=null?C.max:void 0:void 0)||l],p=(o!=null?(k=o.x)!=null?k.steps:void 0:void 0)!=null?r.steps(d,o.x.steps):(o!=null?o.x:void 0)!=null?r.step(d,o.x.step||1):void 0,{curves:f,xscale:v,yscale:b,y:m?m.map(function(e){return{position:e,value:e}}):void 0,x:p?p.map(function(e){return{position:e,value:e}}):void 0}}}(u,e,g,s),b=function(e,t,n,r){return function(i){var s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k;return w=t(i),s=w.arranged,h=w.scale,v=w.xscale,b=w.yscale,u=w.base,y=w.ymax,E=[Infinity,-Infinity],l=E[0],f=E[1],a=-1,c=s.map(function(t){var r,s,o,c,p,d;return r=t.points,p=t.xmin,c=t.xmax,((d=i.axes)!=null?d.x:void 0)!=null&&(f<c&&(f=c),l>p&&(l=p)),s=r.map(h),r.push([c,u]),r.push([p,u]),o=r.map(h),a+=1,n.enhance(i.compute,{item:i.data[a],line:e({points:s,closed:!1}),area:e({points:o,closed:!0}),index:a})}),o=i.axes,g=[(o!=null?(S=o.y)!=null?S.min:void 0:void 0)||u,(o!=null?(x=o.y)!=null?x.max:void 0:void 0)||y],m=(o!=null?(T=o.y)!=null?T.steps:void 0:void 0)!=null?r.steps(g,o.y.steps):(o!=null?o.y:void 0)!=null?r.step(g,o.y.step||1):void 0,d=[(o!=null?(N=o.x)!=null?N.min:void 0:void 0)||l,(o!=null?(C=o.x)!=null?C.max:void 0:void 0)||f],p=(o!=null?(k=o.x)!=null?k.steps:void 0:void 0)!=null?r.steps(d,o.x.steps):(o!=null?o.x:void 0)!=null?r.step(d,o.x.step||1):void 0,{curves:c,xscale:v,yscale:b,y:m?m.map(function(e){return{position:e,value:e}}):void 0,x:p?p.map(function(e){return{position:e,value:e}}):void 0}}}(r,g,e,s),w=function(){var e,t,n,r,i;return n=function(e,t){return e==null&&(e=[]),e.reduce(function(e,n){return Math.max(e,t(n))},0)},i=function(e){return 1+n(e.children,i)},e=function(t,n,r){var i,s;return r==null&&(r=0),s={item:t,level:r},i=n(t),i&&i.length&&(s.children=i.map(function(t){return e(t,n,r+1)})),s},r=function(e,t,n){var i,s,o,u;n==null&&(n=[]),t==null&&(t=0),n[t]!=null?(e.height=n[t]+1,n[t]+=1):(n[t]=0,e.height=0),u=e.children||[];for(s=0,o=u.length;s<o;s++)i=u[s],r(i,t+1,n);return n},t=function(e,n){var r,i,s,o,u;i=[],u=e.children||[];for(s=0,o=u.length;s<o;s++)r=u[s],i.push(n(e,r)),i=i.concat(t(r,n));return i},{tree_height:i,build_tree:e,set_height:r,collect:t}}(),E=function(e,t,n){return function(r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S;return u=r.data,b=r.width,a=r.height,s=r.children,m=r.tension,s==null&&(s=function(e){return e.children}),g=n.build_tree(u,s),h=n.tree_height(g),p=n.set_height(g),l=b/(h-1),f=t([0,h-1],[0,b]),y=function(){S=[];for(var e=0,t=h-1;0<=t?e<=t:e>=t;0<=t?e++:e--)S.push(e);return S}.apply(this).map(function(e){var n,r,i,s;return n=Math.sqrt(e/(h-1))*a,s=(a-n)/2,r=s+n,i=e>0?p[e]+p[e-1]:p[e],i===0?function(e){return a/2}:t([0,i],[s,r])}),d=function(e){var t,n;return t=e.level,n=y[t],[f(t),n(e.height_)]},c=-1,o=n.collect(g,function(t,n){return c+=1,n.height_=n.height+t.height,{connector:e({start:d(t),end:d(n),tension:m}),index:c,item:{start:t.item,end:n.item}}}),i=n.collect(g,function(e,t){return{point:d(t),item:t.item}}),v={point:d(g),item:g.item},{curves:o,nodes:[v].concat(i)}}}(a,t,w),S=function(e,t,n){return function(r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,M,_,D,P,H,B,j;h=r.data,o=r.accessor,M=r.width,v=r.height,d=r.gutter,f=r.compute,T=r.min,x=r.max,o==null&&(o=function(e){return e}),d==null&&(d=0),T==null&&(T=0),x==null&&(x=0),y=0,p=[];for(_=0,P=h.length;_<P;_++)c=h[_],B=o(c),A=B.value,s=B.absolute,j=s?[0,A||y]:[y,y+A],E=j[0],m=j[1],S=Math.min(E,m),i=Math.max(E,m),T=Math.min(T,S),x=Math.max(x,i),y=m,p.push({item:c,low:E,high:m,value:A!=null?A:m});N=p.length,u=(M-d*(N-1))/N,l=[],k=t([T,x],[v,0]);for(g=D=0,H=p.length;D<H;g=++D)c=p[g],b=g*(u+d),C=b+u,a=k(c.low),L=k(c.high),w=n({left:b,right:C,bottom:a,top:L}),l.push(e.enhance(f,{item:c.item,line:w,value:c.value,index:g}));return{curves:l,scale:k}}}(e,t,i),x=function(e,t,n,r){return function(i){var s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,M,_,D,P,H,B,j,F,I,q;l=i.data,s=i.accessor,k=i.width,c=i.height,a=i.compute,o=i.axes,S=i.min_interval,s==null&&(s=function(e){return e}),m=function(){var e,t,n;n=[];for(e=0,t=l.length;e<t;e++)v=l[e],n.push(v);return n}().map(function(e){return{item:e,interval:s(e).slice(0)}}).sort(function(e,t){var n,r;return n=e.interval,r=t.interval,n[0]<=r[0]&&n[1]>=r[1]?1:r[0]<=n[0]&&r[1]>=n[1]?-1:0}),m[0].original_interval=m[0].interval,C=[m[0]],B=m.slice(1);for(M=0,P=B.length;M<P;M++)v=B[M],y=C[0].interval[0],x=C[C.length-1].interval[1],v.interval[0]<y&&C.unshift({item:v.item,interval:[v.interval[0],y],original_interval:[v.interval[0],y]}),v.interval[1]>x&&C.push({item:v.item,interval:[x,v.interval[1]],original_interval:[x,v.interval[1]]});if(S!=null){for(p=_=0,j=C.length-2;0<=j?_<=j:_>=j;p=0<=j?++_:--_)d=C[p].interval,d[1]-d[0]<S&&(C[p].interval[1]=d[0]+S,C[p+1].interval[0]=C[p].interval[1]);g=C[C.length-1],g.interval[1]=Math.max(g.interval[1],g.interval[0]+S)}F=[C[0].interval[0],C[C.length-1].interval[1]],E=F[0],w=F[1],b=t([E,w],[0,k]),T=S!=null?(C=C.map(function(e){return e.scale=t(e.original_interval,e.interval),e}),function(e){var t;return t=C.filter(function(t){return t.original_interval[0]<=e&&e<=t.original_interval[1]})[0],t.scale(e)}):b,f=[],y=0;for(p=D=0,H=C.length;D<H;p=++D)N=C[p],k=N.interval[1]-N.interval[0],f.push(e.enhance(a,{item:N.item,index:p,line:n({left:b(y),right:b(y+k),bottom:0,top:c})})),y+=k;return(o!=null?o.x:void 0)!=null&&(o.x.splits!=null?(u=function(e){var t,n,r,i;return((t=o!=null?(n=o.x)!=null?n.min:void 0:void 0)!=null?t:E)<=e&&e<=((r=o!=null?(i=o.x)!=null?i.max:void 0:void 0)!=null?r:w)},h=S!=null?function(e){var t;return t=e.original_interval,t[1]}:function(e){var t;return t=e.interval,t[1]},L=[E].concat(C.map(h)).filter(u)):(A=[(o!=null?(I=o.x)!=null?I.min:void 0:void 0)||E,(o!=null?(q=o.x)!=null?q.max:void 0:void 0)||w],L=o.x.steps!=null?r.steps(A,o.x.steps):r.step(A,o.x.step||1))),{curves:f,scale:T,x:L!=null?L.map(function(e){return{position:e,value:e}}):void 0}}}(e,t,i,s),T=function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b){return window.paths={Bar:e,Bezier:t,Connector:n,CurvedRectangle:r,Graph:i,Linear:s,Ops:o,Path:u,Pie:a,Polygon:f,Radar:l,Rectangle:c,Sector:h,SemiRegularPolygon:p,SmoothLine:d,Stock:v,Tree:m,Waterfall:g,Axis:y,IntervalGauge:b}}(o,u,a,f,c,t,e,n,d,r,m,i,p,v,y,b,E,S,s,x)})();