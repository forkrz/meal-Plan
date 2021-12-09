export class HtmlElements {

    createSuccessIcon(li, saveIcon) {
        const span = document.createElement('span');
        span.className = "material-icons"
        span.id = 'successIcon'
        span.innerHTML = '<i class="material-icons getNewRandomRecpies">check</i>'
        li.replaceChild(span, saveIcon)
    }

}