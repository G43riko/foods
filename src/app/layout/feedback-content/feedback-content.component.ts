import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl} from "@angular/forms";
import {User} from "../../shared/interfaces/user.interface";
import {FirebaseService} from "../../shared/services/firebase.service";

declare const $: any;

@Component({
    selector: "fds-feedback-content",
    templateUrl: "./feedback-content.component.html",
    styleUrls: ["./feedback-content.component.scss"],
})
export class FeedbackContentComponent implements OnInit {
    public readonly restaurantName = new FormControl();
    public readonly restaurantHomepage = new FormControl();
    public readonly restaurantMenu = new FormControl();
    public readonly review = new FormControl();
    public reviewType = "";
    public loading = false;
    @Output() public readonly close = new EventEmitter<void>();
    @Input() public user: User;

    public constructor(private readonly firebaseService: FirebaseService) {
    }

    public ngOnInit(): void {
        $(".ui.dropdown.language.review-type").dropdown({
            onChange: (value) => {
                this.reviewType = value;
            },
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
            this.close.emit();
            this.loading = false;
        });
    }

    public reset(): void {
        this.reviewType = "";
        this.restaurantName.reset();
        this.review.reset();
        this.restaurantHomepage.reset();
        this.restaurantMenu.reset();
    }
}
