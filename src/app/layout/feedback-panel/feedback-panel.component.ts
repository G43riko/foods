import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {User} from "../../shared/interfaces/user.interface";
import {FeedbackContentComponent} from "../feedback-content/feedback-content.component";

@Component({
    selector: "fds-feedback-panel",
    templateUrl: "./feedback-panel.component.html",
    styleUrls: ["./feedback-panel.component.scss"],
})
export class FeedbackPanelComponent implements OnInit {
    public open = false;
    public closing = false;

    @Output() public readonly onOpen = new EventEmitter();
    @Input() public user: User;
    @ViewChild("textAreaElement", {static: false}) private readonly textAreaElement: ElementRef<HTMLTextAreaElement>;
    @ViewChild(FeedbackContentComponent, {static: false}) private readonly content: FeedbackContentComponent;

    public ngOnInit(): void {
    }

    public toggle(): void {
        if (this.open) {
            this.close();
        } else {
            this.onOpen.emit();
            this.open = true;
        }
    }

    public close(): void {
        if (this.closing) {
            return;
        }
        this.closing = true;
        this.open = false;

        of("").pipe(delay(333)).subscribe(() => {
            this.content.reset();
            this.closing = false;
        });
    }
}
