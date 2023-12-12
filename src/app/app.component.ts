import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Avions } from './avion';
import { AvionsService } from './avions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'examen';

  avions: Avions[] = [];
  avionForm: FormGroup;
  selectedAvion: Avions | null = null;

  constructor(private avionService: AvionsService, private fb: FormBuilder) {
    this.avionForm = this.fb.group({
      id: [0],
      marque: ['', Validators.required],
      description: ['', Validators.required],
      date: ['01/02/2011', Validators.required]
    });
  }

  ngOnInit(): void {
    this.avionService.getAvions().subscribe(response => {
      this.avions = response;
    });
  }

  onSubmit(): void {
    const formData = this.avionForm.value;

    if (this.selectedAvion) {
      this.avionService.updateAvion(formData).subscribe(response => {
        console.log('Avion est mise a jour', response);
        this.avionService.getAvions().subscribe(response => {
          this.avions = response;
        });
        this.selectedAvion = null;
        this.avionForm.reset();
      });
    } else {
      this.avionService.addAvion(formData).subscribe(response => {
        console.log('Avion ajoutée', response);
        this.avions.push(response);
        this.avionForm.reset();
      });
    }
  }

  editAvion(avion: Avions): void {
    this.selectedAvion = avion;
    this.avionForm.patchValue(avion);
  }

  cancelEdit(): void {
    this.selectedAvion = null;
    this.avionForm.reset();
  }

  deleteAvion(id: number): void {
    this.avionService.deleteAvion(id).subscribe(response => {
      console.log('Avion supprimé', response);
      this.avions = this.avions.filter(avion => avion.id !== id);
    });
  }

}
