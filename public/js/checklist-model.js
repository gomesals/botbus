'use strict';angular.module('checklist-model',[]).directive('checklistModel',['$parse','$compile',function($parse,$compile){function contains(arr,item,comparator){if(angular.isArray(arr)){for(var i=arr.length;i--;){if(comparator(arr[i],item)){return true}}}return false}function add(arr,item,comparator){arr=angular.isArray(arr)?arr:[];if(!contains(arr,item,comparator)){arr.push(item)}return arr}function remove(arr,item,comparator){if(angular.isArray(arr)){for(var i=arr.length;i--;){if(comparator(arr[i],item)){arr.splice(i,1);break}}}return arr}function postLinkFn(scope,elem,attrs){var checklistModel=attrs.checklistModel;attrs.$set('checklistModel',null);$compile(elem)(scope);attrs.$set('checklistModel',checklistModel);var getter=$parse(checklistModel);var setter=getter.assign;var checklistChange=$parse(attrs.checklistChange);var checklistBeforeChange=$parse(attrs.checklistBeforeChange);var value=attrs.checklistValue?$parse(attrs.checklistValue)(scope.$parent):attrs.value;var comparator=angular.equals;if(attrs.hasOwnProperty('checklistComparator')){if(attrs.checklistComparator[0]=='.'){var comparatorExpression=attrs.checklistComparator.substring(1);comparator=function comparator(a,b){return a[comparatorExpression]===b[comparatorExpression]}}else{comparator=$parse(attrs.checklistComparator)(scope.$parent)}}scope.$watch(attrs.ngModel,function(newValue,oldValue){if(newValue===oldValue){return}if(checklistBeforeChange&&checklistBeforeChange(scope)===false){scope[attrs.ngModel]=contains(getter(scope.$parent),value,comparator);return}setValueInChecklistModel(value,newValue);if(checklistChange){checklistChange(scope)}});function setValueInChecklistModel(value,checked){var current=getter(scope.$parent);if(angular.isFunction(setter)){if(checked===true){setter(scope.$parent,add(current,value,comparator))}else{setter(scope.$parent,remove(current,value,comparator))}}}function setChecked(newArr,oldArr){if(checklistBeforeChange&&checklistBeforeChange(scope)===false){setValueInChecklistModel(value,scope[attrs.ngModel]);return}scope[attrs.ngModel]=contains(newArr,value,comparator)}if(angular.isFunction(scope.$parent.$watchCollection)){scope.$parent.$watchCollection(checklistModel,setChecked)}else{scope.$parent.$watch(checklistModel,setChecked,true)}}return{restrict:'A',priority:1000,terminal:true,scope:true,compile:function compile(tElement,tAttrs){if((tElement[0].tagName!=='INPUT'||tAttrs.type!=='checkbox')&&tElement[0].tagName!=='MD-CHECKBOX'&&!tAttrs.btnCheckbox){throw'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.'}if(!tAttrs.checklistValue&&!tAttrs.value){throw'You should provide `value` or `checklist-value`.'}if(!tAttrs.ngModel){tAttrs.$set('ngModel','checked')}return postLinkFn}}}]);
//# sourceMappingURL=checklist-model.js.map