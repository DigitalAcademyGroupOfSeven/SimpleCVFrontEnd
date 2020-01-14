import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { FileUploadService } from '@/_services/file-upload.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    properties: Array<string>;
    currentUserSubscription: Subscription;
    fileToUpload: File = null;
    SelectedFile: string = "Select File";
    
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private fileUploadService: FileUploadService
        ) {
            this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
                this.currentUser = user;
            });
            this.properties = User.describe(this.currentUser);        
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
                this.fileToUpload = files.item(0);
                this.SelectedFile = this.fileToUpload.name;
            }
            
            uploadFileToActivity() {
                this.fileUploadService.postFile(this.fileToUpload, this.currentUser).subscribe(
                    (data: any) => {
                        console.log('Success data:' + data);
                       
                    },
                    (error: any) => {
                        console.log(error);
                    }
                    );
                }
                
                
            }