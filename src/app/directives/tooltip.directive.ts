import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { DomHandler } from 'primeng/dom';
@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  public tooltip: HTMLElement;
  public tooltipText: HTMLElement;
  public tooltipArrow: HTMLElement;

  @Input('appTooltip')
  public tooltipTitle;
  @Input() position;

  @Input() forceTooltip: boolean;

  public delay = 1;
  public offset = 5;

  @HostListener('mouseenter') onMouseEnter() {
    console.log(this.el.nativeElement.outerText.length, this.el.nativeElement.clientWidth, this.el.nativeElement.scrollWidth);
    if (!this.tooltip && (this.el.nativeElement.clientWidth !== this.el.nativeElement.scrollWidth || this.forceTooltip)) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) { this.hide(); }
  }

  public show() {
    this.create();
    this.renderer.setStyle(this.tooltip, 'display', 'inline-block');
    this.alignTooltip();
    DomHandler.fadeIn(this.tooltip, 250);
  }

  public hide() {
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }, this.delay);
  }

  create() {
    this.tooltip = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltip, 'p-tooltip');
    this.renderer.addClass(this.tooltip, 'p-component');

    this.tooltipArrow = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipArrow, 'p-tooltip-arrow');

    this.tooltipText = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipText, 'p-tooltip-text');
    this.renderer.setProperty(this.tooltipText, 'innerText', this.tooltipTitle);

    this.renderer.appendChild(this.tooltip, this.tooltipArrow);
    this.renderer.appendChild(this.tooltip, this.tooltipText);

    this.renderer.appendChild(document.body, this.tooltip);
  }
  private alignTooltip() {
    const position = this.position ? this.position : 'top';

    switch (position) {
      case 'top':
        this.alignTop()
        if (this.isOutOfTheBox()) {
          this.alignBottom();
          if (this.isOutOfTheBox()) {
            this.alignRight();
            if (this.isOutOfTheBox()) {
              this.alignLeft();
            }
          }
        }
        break;
      case 'bottom':
        this.alignBottom()
        if (this.isOutOfTheBox()) {
          this.alignTop();
          if (this.isOutOfTheBox()) {
            this.alignRight();
            if (this.isOutOfTheBox()) {
              this.alignLeft();
            }
          }
        }
        break;
      case 'right':
        this.alignRight();
        if (this.isOutOfTheBox()) {
          this.alignTop();
          if (this.isOutOfTheBox()) {
            this.alignBottom();
            if (this.isOutOfTheBox()) {
              this.alignLeft();
            }
          }
        }
        break;
      case 'left':
        this.alignLeft();
        if (this.isOutOfTheBox()) {
          this.alignTop();
          if (this.isOutOfTheBox()) {
            this.alignBottom();
            if (this.isOutOfTheBox()) {
              this.alignRight();
            }
          }
        }
    }
  }

  private isOutOfTheBox(): boolean {
    const offset = this.tooltip.getBoundingClientRect();
    const targetTop = offset.top;
    const targetLeft = offset.left;
    const width = DomHandler.getOuterWidth(this.tooltip);
    const height = DomHandler.getOuterHeight(this.tooltip);
    const viewport = DomHandler.getViewport();
    return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
  }

  private alignTop() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const top = hostPos.top - tooltipPos.height// - this.offset;
    const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    this.tooltip.className = 'p-tooltip p-component p-tooltip-top';
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
  private alignBottom() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const top = hostPos.bottom + this.offset;
    const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    this.tooltip.className = 'p-tooltip p-component p-tooltip-bottom';
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
  private alignLeft() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const top = hostPos.top + hostPos.height - tooltipPos.height / 2;
    const left = hostPos.left - tooltipPos.width - this.offset;
    this.tooltip.className = 'p-tooltip p-component p-tooltip-left';
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
  private alignRight() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const top = hostPos.top + hostPos.height - tooltipPos.height / 2;
    const left = hostPos.right + this.offset;
    this.tooltip.className = 'p-tooltip p-component p-tooltip-right';
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}
