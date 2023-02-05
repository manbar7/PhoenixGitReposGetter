import { Component, OnInit } from '@angular/core';
import { GitItem, GitResult } from 'src/app/models/git-result.model';
import { HomeService } from 'src/app/services/home.service';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit  {
  isLoading:boolean = false;
  searchValue:string = "";
  searchResponse:GitResult | undefined;
  searchResults:GitItem[] = [];
  bookmarks:GitItem[] = [];
  bookmarksTemp:GitItem[] = [];
  hasLoad:boolean = false;
  pageIndex:number = 1;
  isFirstPage:boolean = true;
  showBookmarks:boolean = false;
  constructor(public homeService:HomeService,private router:Router,private jwtHelper: JwtHelperService) {}
  ngOnInit(): void {

  this.loadBookmarks();
  }

  
 // api search for value
  Search(event?:any) {
   this.isLoading= true;
   console.log(this.searchValue);

     this.homeService.GetResults(this.searchValue,this.pageIndex.toString()).subscribe(
      (res: any) => {
        this.hasLoad = true;
        this.showBookmarks = false;
        console.log(res);
        console.log(this.pageIndex, "page index")
        if (this.pageIndex > 1 ) this.isFirstPage = false;
        else if (this.pageIndex == 1 ) this.isFirstPage = true;
        this.isLoading = false;
        this.searchResponse = JSON.parse(JSON.parse(res)) ;
        this.searchResults = this.searchResponse?.items ? this.searchResponse?.items : [];
        // console.log("length : ",this.searchResults.length," ,Results: ",this.searchResults);       
      },
      (error:any) => {
        console.log("error...",error);
      }
    );
  }


  NextPage(){
    this.pageIndex++;
    this.Search();
  }

  PreviousPage(){
    if (this.pageIndex !== 0 ) this.pageIndex--;  
    this.Search();
  }

  ClearSearch() {
    console.log("clearing search");
    this.searchValue = "";
    this.searchResponse = undefined;
    this.searchResults = [];
    this.hasLoad = false;
  }


  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
  }


  logOut() {
    console.log("log out")
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
  }

  
  
addToBookmarks(result:any){
  result.bookmarked = !result.bookmarked;
  if (!this.bookmarks.includes(result)) {
    this.bookmarks.push(result);
    localStorage.setItem('git_repos_bookmarks',JSON.stringify(this.bookmarks) )
    return;
  } else {
    const tempArray = localStorage.getItem('git_repos_bookmarks') ? localStorage.getItem('git_repos_bookmarks') : undefined;
    if (tempArray !== undefined) {
      const parsedArray = tempArray ? JSON.parse(tempArray) : null ;
      this.bookmarksTemp = parsedArray;
      var itemIndex = this.bookmarks.findIndex((item) => item.id == result.id);
      this.bookmarks.splice(itemIndex, 1);
      localStorage.removeItem('git_repos_bookmarks');
      this.bookmarksTemp = this.bookmarks;
      localStorage.setItem('git_repos_bookmarks',JSON.stringify(this.bookmarksTemp) )
      return;
   }
  }  
}


removeItemFromBookmarks(bookmarksTemp:any){
localStorage.removeItem('git_repos_bookmarks');
localStorage.setItem('git_repos_bookmarks',bookmarksTemp)
}

ShowSavedBookmarks(){
  this.showBookmarks = true;
  const tempArray = localStorage.getItem('git_repos_bookmarks') ? localStorage.getItem('git_repos_bookmarks') : undefined;
  if (tempArray !== undefined) {
    const parsedArray = tempArray ? JSON.parse(tempArray) : null ;
    this.bookmarks = parsedArray;
  }
  console.log(this.bookmarks);
  
}

loadBookmarks(){
  const tempArray = localStorage.getItem('git_repos_bookmarks') ? localStorage.getItem('git_repos_bookmarks') : undefined;
  if (tempArray !== undefined) {
    const parsedArray = tempArray ? JSON.parse(tempArray) : null ;
    this.bookmarks = parsedArray;
  }
}
}
