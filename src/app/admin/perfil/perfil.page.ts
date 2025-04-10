import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { userService } from 'src/app/services/user.service';
import { User, UserPerfil } from 'src/interfaces/user.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false

})
export class PerfilPage implements OnInit {

  profileImage: string = 'https://storage.googleapis.com/ferrientregas/ferrientregas/23ca51f2-9075-458d-b266-5c9f5b329677.jpg';
  coverImage: string = 'assets/Group 136.svg';
  userForm: FormGroup;
  perfilImagen!: File;
  user: User | undefined;
  file: File | null = null;
  constructor(private userService: userService, private fb: FormBuilder, private imagenesService: ImagenesService) { 
    this.userForm = this.fb.group({
          nombres: ['', Validators.required],
          apellidos: ['', Validators.required],
          correo: ['', [Validators.required, Validators.email]],
        });
  }

  ngOnInit() {
    this.getUser();

  }
  ngAfterViewInit() {
    // this.getUser();

  }
  uploadImage() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.perfilImagen = fileInput.files[0];
      console.log(this.perfilImagen);
    }
  }
  submit() {
    if (this.file) {
      
      this.imagenesService.enviarImagen(this.file).subscribe({
        next: (response) => {
          if (this.userForm.valid) {
            console.log('Imagen subida:', response);
                this.profileImage = response.result[0]
                const user: UserPerfil = {
                  id: this.user?.id || '',
                  firstNames: this.userForm.value.nombres,
                  lastNames: this.userForm.value.apellidos,
                  email: this.userForm.value.correo,
                  profileImage: this.profileImage,
                };
                console.log(user);
                this.userService.updateuserProfile(user).subscribe((response) => {
                  console.log(response);
                });
          }
        },
        error: (error) => {
          console.error('Error al subir la imagen:', error);
        }
      });
    } else{
      if (this.userForm.valid) {
            const user: UserPerfil = {
              id: this.user?.id || '',
              firstNames: this.userForm.value.nombres,
              lastNames: this.userForm.value.apellidos,
              email: this.userForm.value.correo,
              profileImage: this.profileImage,
            };
            console.log(user);
            this.userService.updateuserProfile(user).subscribe((response) => {
              console.log(response);
            });
      }
    }

   
    }
  getUser() {
    this.userService.getCurrentUser().subscribe((response) => {
      console.log(response.result);
      if (response.result.profileImage) {
        this.profileImage = response.result.profileImage;
      }
      this.user = response.result;
        this.userForm.patchValue({
          nombres: this.user.firstNames,
          apellidos: this.user.lastNames,
          correo: this.user.email,
        });
    });
    
  }
  onProfileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      this.convertToBase64(file).then((base64: string) => {
        this.profileImage = base64;
      });
    }
  }

  onCoverSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file).then((base64: string) => {
        this.coverImage = base64;
      });
    }
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}

