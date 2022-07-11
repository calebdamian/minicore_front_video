import { Component, OnInit } from '@angular/core';
import {Pass} from "../../models/pass";
import {User} from "../../models/user";
import {PassService} from "../../services/pass.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  passes: Pass[] = [];
  users: User[] = [];
  from = new Date('December 25, 1995 13:30:00');
  today =  new Date();
  pass: any;

  constructor(
    private passService: PassService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.from = this.today;
    this.getPasses();
    this.getUsers();
  }

  getPasses(): void{
    this.passService.getPasses()
      .subscribe(passes=> this.passes = passes);
  }

  getUsers(): void{
    this.userService.getUsers()
      .subscribe(users=> this.users = users);
  }
  getPass(id: string): string {
    this.passService.getPass(id)
      .subscribe({
        next: (data) => {
          this.pass = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    return this.pass.type;
  }

  remainingPasses(purchaseDate: Date, passes: number, filterDate: Date): number{
    const date1 = new Date(purchaseDate);
    const date2 = new Date(filterDate);

    const Time = date2.getTime() - date1.getTime();
    const Days = Math.round(Time / (1000 * 3600 * 24));
    const remaining = passes - Days;
    return remaining;
  }

}
