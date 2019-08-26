import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {delay, tap} from "rxjs/operators";
import {User} from "../../shared/interfaces/user.interface";
import {FirebaseService} from "../../shared/services/firebase.service";

declare const $: any;

@Component({
    selector: "fds-feedback-panel",
    templateUrl: "./feedback-panel.component.html",
    styleUrls: ["./feedback-panel.component.scss"],
})
export class FeedbackPanelComponent implements OnInit {
    public open = false;
    public closing = false;
    public readonly restaurantName = new FormControl();
    public readonly restaurantHomepage = new FormControl();
    public readonly restaurantMenu = new FormControl();
    public readonly review = new FormControl();
    public reviewType = "";
    @Output() public readonly onOpen = new EventEmitter();
    @Input() public user: User;
    @ViewChild("textAreaElement", {static: false}) private readonly textAreaElement: ElementRef<HTMLTextAreaElement>;
    public loading = false;

    public constructor(private readonly firebaseService: FirebaseService) {

    }

    public ngOnInit(): void {
        $(".ui.dropdown.language.review-type").dropdown({
            onChange: (value) => {
                this.reviewType = value;
            },
        });
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
            this.reviewType = "";
            this.closing = false;
            this.restaurantName.reset();
            this.review.reset();
            this.restaurantHomepage.reset();
            this.restaurantMenu.reset();
        });
    }

    public sendFeedback(): void {
        if (this.loading) {
            return;
        }
        this.loading = true;
        const reviewObject = {
            restaurantName: this.restaurantName.value,
            review: this.review.value,
            user: this.user.email,
            restaurantHomepage: this.restaurantHomepage.value,
            restaurantMenu: this.restaurantMenu.value,
        };
        this.firebaseService.sendFeedback(reviewObject).subscribe(() => {
            this.close();
            this.loading = false;
        });
    }
}
