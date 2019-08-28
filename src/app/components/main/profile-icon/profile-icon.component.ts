import { Component, OnInit } from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: "fds-profile-icon",
  templateUrl: "./profile-icon.component.html",
  styleUrls: ["./profile-icon.component.scss"],
})
export class ProfileIconComponent implements OnInit {

  constructor(public readonly authService: AuthService) { }

  public ngOnInit() {
  }

}
