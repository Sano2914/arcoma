import { snippetCode } from "@core/components/card-snippet/card-snippet.component";

export const snippetCodeBasicDP: snippetCode = {
    html: `
    <!-- Basic Date Picker -->
    <form class="form-inline">
      <div class="form-group">
        <div class="input-group">
          <input class="form-control" placeholder="yyyy-mm-dd" name="Basic Date Picker" [(ngModel)]="basicDPdata"
            ngbDatepicker #basicDP="ngbDatepicker">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary feather icon-calendar" (click)="basicDP.toggle()"
              type="button" rippleEffect></button>
          </div>
        </div>
      </div>
    </form>
    <pre class="mt-2 p-1">Model: {{ basicDPdata | json }}</pre>
    <!--/ Basic Date Picker -->
    `,
    ts: `
    public basicDPdata: NgbDateStruct;
  
    `
}