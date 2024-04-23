import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Route } from "../interfaces/common";
import { profileRoutes } from "src/app/const/profile.routes";

@Injectable({
  providedIn: 'root'
})
export class SubmenuModel {
  private _submenuOptions: Route[] = [];

  constructor(private router: Router) {}

  get submenuOptions(): Route[] {
    return this._submenuOptions;
  }

  set submenuOptions(submenuOptions: Route[]) {
    this._submenuOptions = submenuOptions;
  }

  public navigateOption(option: number): void {
    this.router.navigate([this._submenuOptions[option].path]);
  }
}
