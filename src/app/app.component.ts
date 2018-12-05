import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prova';
  contato = {
    nome: '',
    telefone: '',
    email: ''
  }
  contatos: Observable<any>;
  constructor(private db: AngularFireDatabase) {

  }

  insert(){
    this.db.list('contato').push(this.contato)
      .then((result: any) => {
        console.log(result.key)
        this.contato.nome = '';
        this.contato.telefone = '';
        this.contato.email = '';
      });
  }

  list(){
    return this.db.list('contato')
      .snapshotChanges()
      .pipe(
        map(changes => {
          console.log(changes);
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))         
        }
      )
    )    
  }

  delete(key:string){
    this.db.list('contato').remove(key);
  }

  ngOnInit(){
    this.contatos = this.list()
  }
  
}
