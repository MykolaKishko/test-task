import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { SearchComponent } from './search/search.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
    { path: 'system', component: SystemComponent, children: [
        { path: 'search', component: SearchComponent },
        { path: 'userInfo', component: UserInfoComponent},
        { path: 'createUser', component: CreateUserComponent },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SystemRoutingModule {}
