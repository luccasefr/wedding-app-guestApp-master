import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle, faThumbsUp, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { PostService } from '../post.service';
import { ModalComponent } from '../modal/modal.component';
import { NotificationsService } from '../notifications.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    faImage = faImage;
    faTimesCircle = faTimesCircle;
    imagePreview;
    form;
    faThumbsUp = faThumbsUp;
    faTrashAlt = faTrashAlt;
    input;
    text;
    posts;
    public loading = false;
    postSelectedForDelete;

    @ViewChild('imageInput') myInputVariable: ElementRef;
    @ViewChild('deleteModal') deleteModal: ModalComponent;

    constructor(private postService: PostService, private notificationsService: NotificationsService) {
        this.form = new FormData();
        this.getPosts();
    }

    ngOnInit() {
        this.loading = true;
    }

    async onSubmit() {
        this.loading = true;
        this.form.append('guest_id', localStorage.getItem('guestId'))
        this.form.append('text', this.text)
        console.log("AQUI TA O LOG", this.posts)
        await this.postService.post(this.form)
        this.getPosts()
        this.text = "";
        this.removeImage()
    }

    showModalForDelete(post) {
        this.deleteModal.open('Deletar post', 'Tem certeza que deseja deletar este post?', async () => {
            await this.postService.deletePost(post.id);
            this.getPosts();
        });
    }

    getProfileImg(obj) {
        return new Promise(async (res, rej) => {
            let reader = new FileReader();
            reader.onload = (response: any) => {
                obj.imgPerfil = response.target.result;
                res(response.target.result);
            }

            reader.readAsDataURL(await this.postService.getProfileImage(obj.guest.id));

        });
    }

    getPostImg(post) {
        return new Promise(async (res, rej) => {
            let reader = new FileReader();
            reader.onload = (response: any) => {
                post.image = response.target.result;
                res(response.target.result);
            }
            reader.readAsDataURL(await this.postService.getPpostImage(post.id));
        });
    }

    async getPosts() {
        this.posts = await this.postService.getAll();
        this.loading = false;
        for (let i = 0; i < this.posts.length; i++) {
            this.getProfileImg(this.posts[i]);
            if (this.posts[i].image_url) {
                this.getPostImg(this.posts[i]);
            }
            if (this.posts[i].guest_id == localStorage.getItem('guestId')) {
                this.posts[i].isMine = true;
                this.loading = false;
            } else {
                this.posts[i].isMine = false;
            }
        }
    }

    async like(post) {
        await this.postService.like(post.id);
        post.guests_likes = await this.postService.likes(post.id);
    }

    onLoadImage(event: any) {
        console.log(event.target);
        if (event.target.files.length > 0) {
            let reader = new FileReader();
            reader.onload = (file: any) => {
                this.imagePreview = file.target.result;
            }
            this.input = event;

            reader.readAsDataURL(event.target.files[0]);
            this.form.append('image', event.target.files[0]);
        }
    }

    removeImage() {
        this.myInputVariable.nativeElement.value = "";
        this.imagePreview = undefined;
        this.form = new FormData();
    }

}
