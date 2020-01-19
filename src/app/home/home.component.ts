import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { FileUploadService } from '@/_services/file-upload.service';
import { OrcidService } from '@/_services/orcid.service';

@Component({ 
    templateUrl: 'home.component.html',
    styles: ['.scrollable { height:300px; overflow-y: scroll; } ']
})
export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild('orcid') orcid: ElementRef;
    currentUser: User;
    currentUserSubscription: Subscription;
    fileToUpload: File = null;
    SelectedFile: string = "Select File";
    uploadLoading = false;
    orcidLoading = false;
    
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private fileUploadService: FileUploadService,
        private orcidService: OrcidService
        ) {
            this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
                
                this.currentUser = user;
            });
        }
        
        ngOnInit() {
        }
        
        ngOnDestroy() {
            // unsubscribe to ensure no memory leaks
            this.currentUserSubscription.unsubscribe();
        }
        
        process() {
            this.userService.process(this.currentUser)
            .pipe(first())
            .subscribe(
                data => {
                    console.log('proccess success')
                },
                error => {
                    console.log('proccess failed')
                });
                
            }
            
        handleFileInput(files: FileList) {
            if(files){
                this.fileToUpload = files.item(0);
                this.SelectedFile = this.fileToUpload.name;
            }
        }
        
        uploadFileToActivity() {
            this.uploadLoading = true;
            this.fileUploadService.postFile(this.fileToUpload, this.currentUser).subscribe(                
                (data: any) => {
                    if(data){
                        console.log('update user')
                        this.updateCurrentUser()
                        }
                    this.uploadLoading = false;                
                },
                (error: any) => {
                    console.log(error);
                }
                );
            }

            getOrcid() {
                this.orcidLoading = true;
                this.orcidService.getById(this.orcid.nativeElement.value).subscribe(
                    (data: any) => {
                        this.currentUser.orcid = data
                        console.log(data)
                        console.log('orcid success')
                        this.orcidLoading = false
                        this.updateCurrentUser();
                    },
                    (error: any) => {
                        console.log(`error: ${error}`);
                    }
                );
            }

            updateCurrentUser() {
                this.userService.update(this.currentUser).subscribe(
                    (data: any) => {
                        console.log(this.currentUser)
                        console.log('user updated')
                    },
                    (error: any) => {
                        console.log(error);
                    }
                    );
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
            }
        }