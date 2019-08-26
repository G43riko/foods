import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import {User} from "../../shared/interfaces/user.interface";
import {FirebaseService} from "../../shared/services/firebase.service";

@Component({
    selector: "fds-feedback-panel",
    templateUrl: "./feedback-panel.component.html",
    styleUrls: ["./feedback-panel.component.scss"],
})
export class FeedbackPanelComponent implements OnInit {
    public open = false;
    public readonly restaurantName = new FormControl();
    public readonly restaurantHomepage = new FormControl();
    public readonly restaurantMenu = new FormControl();
    public readonly review = new FormControl();
    @Output() public readonly onOpen = new EventEmitter();
    @Input() public user: User;
    @ViewChild("textAreaElement", {static: false}) private readonly textAreaElement: ElementRef<HTMLTextAreaElement>;
    public loading = false;

    public constructor(private readonly firebaseService: FirebaseService) {

    }

    public ngOnInit(): void {
    }

    public toggle(): void {
        this.open = !this.open;
        if (this.open) {
            this.onOpen.emit();
        }
    }

    public close(): void {
        this.open = false;
    }

    public sendFeedback(): void {
        if (this.loading) {
            return;
        }
        this.loading = true;
        const reviewObject = {
            restaurantName: this.restaurantName.value,
            review: this.review.value,
            restaurantHomepage: this.restaurantHomepage.value,
            restaurantMenu: this.restaurantMenu.value,
        };
        this.restaurantName.reset();
        this.review.reset();
        this.restaurantHomepage.reset();
        this.restaurantMenu.reset();
        this.firebaseService.sendFeedback(reviewObject).subscribe((data) => {
            this.close();
            this.loading = false;
        });
    }
}
