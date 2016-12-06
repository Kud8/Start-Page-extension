/**
 * Created by Дмитрий on 06.12.2016.
 */

import {replaceHrefsIntoStorage} from './storage'

var dragSrcEl = null;

function replaceTabs(firstElement, secondElement) {
    let from = firstElement.firstChild.firstChild.getAttribute('href');
    let to = secondElement.firstChild.firstChild.getAttribute('href');

    let tmpHtml = firstElement.innerHTML;
    firstElement.innerHTML = secondElement.innerHTML;
    secondElement.innerHTML = tmpHtml;

    replaceHrefsIntoStorage(from, to);
}

export function handleDrop(e) {
    e.stopPropagation();
    console.log(e.target);
    console.log(dragSrcEl);
    console.log(e.currentTarget);
    dragSrcEl.classList.remove('dragStart');

    let self = e.currentTarget;
    if (dragSrcEl != self) {
        replaceTabs(dragSrcEl, self)
    }
    self.classList.remove('over');

    return false;
}

export function handleDragStart(e) {
    let self = e.currentTarget;
    self.classList.add('dragStart');
    dragSrcEl = self;

    e.dataTransfer.effectAllowed = 'move';
}

export function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    let self = e.currentTarget;
    self.classList.add('over');

    return false;
}

export function handleDragLeave(e) {
    let self = e.currentTarget;
    self.classList.remove('over');
}

export function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragStart');
}