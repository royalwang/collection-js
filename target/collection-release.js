(function(){Collection={};var noop=function(){},isArray=function(e){return Object.prototype.toString.call(e)==="[object Array]"},slice=Array.prototype.slice,cloneArray=function(e){return slice.apply(e)},getId=Collection.getId=function(){var e=0,t="__instanceId__",n=function(n){return typeof n+"-"+(n instanceof Object?n[t]||(n[t]=++e):n)};return n.reset=function(){e=0},n}(),createType=function(typeName,inheritFrom){var Type=function(e){if(!(this instanceof Type)){var t=cloneArray(arguments);return t.selfCall=!0,new Type(t)}typeof this._init=="function"&&this._init.apply(this,e&&e.selfCall?e:arguments)};return eval("Type = "+Type.toString().replace("function","function "+typeName)+";"),Type.typeName=typeName,inheritFrom&&(Type.prototype=new inheritFrom,Type.prototype.constructor=Type),Type},keyArgs=function(e,t){return{isKeyArgs:!0,keyFunction:e,args:t}},getKeyFunction=function(e){return e.length&&e[0].isKeyArgs?e[0].keyFunction:getId},getArgs=function(e){return e.length&&e[0].isKeyArgs?e[0].args:e},initPairs=function(e,t){if(t.length%2!=0)throw new Error("A Map constructor requires an even number of arguments");for(var n=0,r=t.length;n<r-1;n+=2)e.put(t[n],t[n+1])},Iterable=function(e){if(this instanceof Iterable)return;return IterableArray(e)};Iterable.prototype.size=function(){return this.items.length},Iterable.prototype.isEmpty=function(){return this.size()==0},Iterable.prototype.first=function(){return this._assertNotEmpty("first"),this.items[0]},Iterable.prototype.last=function(){return this._assertNotEmpty("last"),this.items[this.items.length-1]},Iterable.prototype.each=function(e){for(var t=0,n=this.items.length;t<n;t++)this._invoke(e,t)},Iterable.prototype.map=function(e){var t=[];for(var n=0,r=this.items.length;n<r;n++)t.push(this._invoke(e,n));return this._createNew(t)},Iterable.prototype.extractProperty=function(e){var t=e.split("."),n=getPropertyFunction(t),r=[];for(var i=0,s=this.items.length;i<s;i++)r.push(n(this.items[i],t));return List.fromArray(r)},Iterable.prototype.filter=function(e){var t=[];for(var n=0,r=this.items.length;n<r;n++)this._invoke(e,n)&&t.push(this.items[n]);return this._createNew(t)},Iterable.prototype.contains=function(e){for(var t=0,n=this.items.length;t<n;t++)if(this.items[t]===e)return!0;return!1},Iterable.prototype.count=function(e){var t=0;for(var n=0,r=this.items.length;n<r;n++)this._invoke(e,n)&&t++;return t},Iterable.prototype.find=function(e){for(var t=0,n=this.items.length;t<n;t++)if(this._invoke(e,t))return this.items[t];return undefined},Iterable.prototype.some=function(e){for(var t=0,n=this.items.length;t<n;t++)if(this._invoke(e,t))return!0;return!1},Iterable.prototype.every=function(e){for(var t=0,n=this.items.length;t<n;t++)if(!this._invoke(e,t))return!1;return!0},Iterable.prototype.grouped=function(e){var t=[],n=[];for(var r=0,i=this.items.length;r<i;r++){n.push(this.items[r]);if(n.length===e||r===i-1)t[t.length]=this._createNew(n),n=[]}return List.fromArray(t)},Iterable.prototype.groupBy=function(e){var t=Map();for(var n=0,r=this.items.length;n<r;n++){var i=this.items[n],s=this._invoke(e,n),o=t.get(s);o||t.put(s,List()),t.get(s).add(i)}return t},Iterable.prototype.fold=function(e,t){var n=e;for(var r=0,i=this.items.length;r<i;r++)n=this._invoke(t,r,n);return n},Iterable.prototype.partition=function(e){var t=[],n=[];for(var r=0,i=this.items.length;r<i;r++)(this._invoke(e,r)?t:n).push(this.items[r]);return[this._createNew(t),this._createNew(n)]},Iterable.prototype.drop=function(e){return e=Math.min(e,this.items.length),this._createNew(this.items.slice(e))},Iterable.prototype.dropRight=function(e){return e=Math.min(e,this.items.length),this._createNew(this.items.slice(0,this.items.length-e))},Iterable.prototype.dropWhile=function(e){var t=this.items.slice(),n=0;while(t.length&&this._invoke(e,n))t.shift(),n++;return this._createNew(t)},Iterable.prototype.take=function(e){return e=Math.min(e,this.items.length),this._createNew(this.items.slice(0,e))},Iterable.prototype.takeRight=function(e){return e=Math.min(e,this.items.length),this._createNew(this.items.slice(-e))},Iterable.prototype.takeWhile=function(e){var t=[];for(var n=0,r=this.items.length;n<r;n++){if(!this._invoke(e,n))break;t.push(this.items[n])}return this._createNew(t)},Iterable.prototype.sameItems=function(e){if(this.size()!=e.size())return!1;for(var t=0,n=this.items.length;t<n;t++)if(this.items[t]!==e.items[t])return!1;return!0},Iterable.prototype.reverse=function(){return this._createNew(this.items.slice().reverse())},Iterable.prototype.slice=function(e,t){return this._createNew(this.items.slice(e,t))},Iterable.prototype.mkString=function(e,t,n){return e+this.items.join(t)+n},Iterable.prototype.toList=function(){return List.fromArray(this.items)},Iterable.prototype.toArray=function(){return cloneArray(this.items)},Iterable.prototype.clone=function(){return this._createNew(this.items.slice())},Iterable.prototype.toString=function(){return this.constructor.typeName+"("+this.items.join(", ")+")"},Iterable.prototype._createNew=function(e){return this.constructor.fromArray(e)},Iterable.prototype._invoke=function(e,t,n){return e(this.items[t],n)},Iterable.prototype._assertNotEmpty=function(e){if(this.items.length==0)throw new Error(e+"() cannot be called on an empty collection")};var getPropertyFunction=function(e){return e.length==1?getSimpleProperty:getNestedProperty},getSimpleProperty=function(e,t){return e[t[0]]},getNestedProperty=function(e,t){var n=0,r=e,i=t.length;while(n<i){if(r===undefined)return null;r=r[t[n]],n++}return r},IterableArray=createType("IterableArray",Iterable);IterableArray.prototype._init=function(e){this.items=e},IterableArray.fromArray=function(e){return e},Collection.Iterable=Iterable;var List=createType("List",Iterable);List.fromArray=function(e){return List.apply(null,e)},List.prototype._init=function(){this.items=cloneArray(arguments)},List.prototype.items=null,List.prototype.add=function(e){return this.items.push(e),this},List.prototype.addAt=function(e,t){return this._assertRange(t),this.items.splice(t,0,e),this},List.prototype.update=function(e,t){this._assertRange(e);var n=this.items[e];return n!==t&&(this.items[e]=t),this},List.prototype.insert=function(e,t){t=t||this._defaultSortFunction;var n=0,r=this.size();while(n<r){var i=n+r>>1;t(e,this.items[i])>0?n=i+1:r=i}return this.addAt(e,n),this},List.prototype.remove=function(e){var t=this.indexOf(e);return t>-1?this.items.splice(t,1)[0]:!1},List.prototype.removeAt=function(e){var t=this.items.splice(e,1)[0];return t},List.prototype.removeFirst=function(){return this._assertNotEmpty("removeFirst"),this.removeAt(0)},List.prototype.removeLast=function(){return this._assertNotEmpty("removeLast"),this.removeAt(this.items.length-1)},List.prototype.removeAll=function(){var e=this.size();return e>0&&this.items.splice(0,e),this},List.prototype.removeIf=function(e){var t=[];for(var n=0,r=this.items.length;n<r;n++)e(this.items[n])&&(t.push(this.items[n]),this.items.splice(n,1),n--);return List.fromArray(t)},List.prototype.indexOf=function(e,t){t=t||0;for(var n=t,r=this.items.length;n<r;n++)if(this.items[n]===e)return n;return-1},List.prototype.lastIndexOf=function(e){for(var t=this.items.length-1;t>=0;t--)if(this.items[t]===e)return t;return-1},List.prototype.contains=function(e){return this.indexOf(e)!=-1},List.prototype.distinct=function(){var e=Set();for(var t=0,n=this.items.length;t<n;t++)e.add(this.items[t]);return e.toList()},List.prototype.sort=function(e){return this.items.sort(e),this},List.prototype.sortBy=function(e){var t=this;return this.items.sort(function(t,n){var r=e(t),i=e(n);return r<i?-1:r>i?1:0}),this},List.prototype.toSet=function(){return Set.fromArray(this.items)},List.prototype._defaultSortFunction=function(e,t){return e<t?-1:e>t?1:0},List.prototype._assertRange=function(e){if(e<0||e>this.size())throw new Error("Illegal insertion at index "+e+" in List with size "+(this.size()-1))},Collection.List=List;var Map=createType("Map");Map.withKey=function(e){var t=slice.call(arguments,1);return Map(keyArgs(e,t))},Map.prototype._init=function(){var e=getKeyFunction(arguments),t=getArgs(arguments);this.getId=e,this.keyIdToEntry={},initPairs(this,t)},Map.prototype.keyIdToEntry=null,Map.prototype.getId=null,Map.prototype.addedEntry=null,Map.prototype.removedEntry=null,Map.prototype.put=function(e,t){var n=this.getId(e),r=this.keyIdToEntry[n]?this.keyIdToEntry[n].value:undefined,i;return r===undefined?(i=Entry(e,t),this.keyIdToEntry[n]=i,this._size++):(i=this.keyIdToEntry[n],i.value=t),this.addedEntry=i,r},Map.prototype.remove=function(e){var t=this.getId(e),n=this.keyIdToEntry[t],r=n?n.value:undefined;return r!==undefined&&(this.removedEntry=n,delete this.keyIdToEntry[t],this._size--),r},Map.prototype.removeIf=function(e){var t=this.keyIdToEntry;for(var n in t)e(t[n].key,t[n].value)&&(delete t[n],this._size--)},Map.prototype.removeAll=function(){this.keyIdToEntry={},this._size=0},Map.prototype.get=function(e){var t=this.keyIdToEntry[this.getId(e)];return t?t.value:undefined},Map.prototype.containsKey=function(e){return this.get(e)!==undefined},Map.prototype.containsValue=function(e){var t=this.keyIdToEntry;for(var n in t)if(t[n].value===e)return!0;return!1},Map.prototype.keys=function(){var e=[];for(var t in this.keyIdToEntry)e.push(this.keyIdToEntry[t].key);return List.fromArray(e)},Map.prototype.values=function(){var e=[];for(var t in this.keyIdToEntry)e.push(this.keyIdToEntry[t].value);return List.fromArray(e)},Map.prototype.each=function(e){for(var t in this.keyIdToEntry)e(this.keyIdToEntry[t].key,this.keyIdToEntry[t].value)},Map.prototype._size=0,Map.prototype.size=function(){return this._size},Map.prototype.toList=function(){var e=[];for(var t in this.keyIdToEntry)e.push(this.keyIdToEntry[t]);return List.fromArray(e)},Map.prototype.toArray=function(){return this.toList().items},Map.prototype.clone=function(){var e=Map();return e.getId=this.getId,this.each(function(t,n){e.put(t,n)}),e},Map.prototype.toString=function(){return"Map("+this.toArray().join(", ")+")"};var Entry=createType("Entry");Entry.prototype._init=function(e,t){this.key=e,this.value=t},Entry.prototype.key=null,Entry.prototype.value=null,Entry.prototype.equals=function(e){return this.key===e.key&&this.value===e.value},Entry.prototype.toString=function(){return this.key+" -> "+this.value},Collection.Map=Map;var Set=createType("Set");Set.fromArray=function(e){return Set.apply(null,e)},Set.withKey=function(e){var t=slice.call(arguments,1);return Set(keyArgs(e,t))},Set.prototype.map=null,Set.prototype._init=function(){var e=getKeyFunction(arguments),t=getArgs(arguments);this.map=Map.withKey(e);for(var n=0,r=t.length;n<r;n++)this.add(t[n])},Set.prototype.add=function(e){return this.contains(e)?!1:(this.map.put(e,1),!0)},Set.prototype.contains=function(e){return this.map.containsKey(e)},Set.prototype.remove=function(e){return this.map.remove(e)==1},Set.prototype.removeIf=function(e){this.map.removeIf(e)},Set.prototype.removeAll=function(){this.map.removeAll()},Set.prototype.each=function(e){this.map.each(e)},Set.prototype.size=function(){return this.map.size()},Set.prototype.toList=function(){return this.map.keys()},Set.prototype.toArray=function(){return this.toList().items},Set.prototype.clone=function(){return Set.withKey.apply(null,[this.map.getId].concat(this.map.keys().items))},Set.prototype.toString=function(){return"Set("+this.toArray().join(", ")+")"},Collection.Set=Set;var ArrayMap=createType("ArrayMap",Iterable);ArrayMap.withKey=function(e){var t=slice.call(arguments,1);return ArrayMap(keyArgs(e,t))},ArrayMap.prototype._init=function(){var e=getKeyFunction(arguments),t=getArgs(arguments);this._map=Map.withKey(e),this.items=[],initPairs(this,t)},ArrayMap.prototype._map=null,ArrayMap.prototype.items=null,ArrayMap.prototype.put=function(e,t){var n=this._map.put(e,t),r=this._map.addedEntry;return n===undefined?(this.items.push(r),this._setMeta(r)):r.value=t,n},ArrayMap.prototype.remove=function(e){var t=this._map.remove(e);return t!==undefined&&this._removeEntryItem(this._map.removedEntry),t},ArrayMap.prototype.removeIf=function(e){for(var t=0;t<this.items.length;t++){var n=this.items[t];e(n.key,n.value)&&(this.remove(n.key),t--)}},ArrayMap.prototype.removeAll=function(){this._map.removeAll(),this.items=[]},ArrayMap.prototype.get=function(e){return this._map.get(e)},ArrayMap.prototype.containsKey=function(e){return this._map.containsKey(e)},ArrayMap.prototype.containsValue=function(e){return this._map.containsValue(e)},ArrayMap.prototype.keys=function(){var e=Iterable(this.items).map(function(e){return e.key});return List.fromArray(e)},ArrayMap.prototype.values=function(){var e=Iterable(this.items).map(function(e){return e.value});return List.fromArray(e)},ArrayMap.prototype._removeEntryItem=function(e){var t=Math.min(e.meta.insertionIndex,this.items.length-1),n=t<10?this._entryIndexLinearSearch(e,t):this._entryIndexBinarySearch(e,t);this.items.splice(n,1)},ArrayMap.prototype._entryIndexLinearSearch=function(e,t){var n=t;while(n>=0){if(this.items[n]==e)return n;n--}},ArrayMap.prototype._entryIndexBinarySearch=function(e,t){var n=0,r=t,i=e.meta.insertionIndex;while(n<r){var s=n+r>>1;i>this.items[s].meta.insertionIndex?n=s+1:r=s}return n},ArrayMap.prototype._setMeta=function(e){e.meta=function(){},e.meta.insertionIndex=this.items.length-1},ArrayMap.prototype.contains=ArrayMap.prototype.containsKey,ArrayMap.prototype.sameItems=function(e){if(this.size()!=e.size())return!1;for(var t=0,n=this.items.length;t<n;t++)if(!this.items[t].equals(e.items[t]))return!1;return!0},ArrayMap.prototype._invoke=function(e,t,n){var r=this.items[t];return e(r.key,r.value,n)},ArrayMap.prototype._createNew=function(e){var t=ArrayMap.withKey(this._map.getId),n=e.length&&e[0].key&&e[0].value;if(n)for(var r=0,i=e.length;r<i;r++)t.put(e[r].key,e[r].value);else for(var r=0,i=e.length;r<i;r++)t.put(e[r][0],e[r][1]);return t},Collection.ArrayMap=ArrayMap})()