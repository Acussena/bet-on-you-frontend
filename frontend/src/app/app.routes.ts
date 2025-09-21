import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MenuComponent } from './pages/menu/menu.component';
import { QuestionarioComponent } from './pages/questionario/questionario.component';
import { ConscientizacaoComponent } from './pages/conscientizacao/conscientizacao.component';
import { RedeApoioComponent } from './pages/redeApoio/redeApoio.component';
import { DepoimentosListaComponent } from './pages/depoimentos-lista/depoimentos-lista.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'cadastro', component: CadastroComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'questionario', component: QuestionarioComponent},
    { path: 'conscientizacao', component: ConscientizacaoComponent},
    { path: 'redeApoio', component: RedeApoioComponent},
    { path: 'depoimentos', component: DepoimentosListaComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' }

];

