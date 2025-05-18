import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
//sidebar
import { SidebarComponent } from './sidebar/sidebar.component';
import { PopulationTableComponent } from './population-table/population-table.component';
import { LoginComponent } from './login/login.component';
import { GeneralDataComponent } from './general-data/general-data.component';
import { EmploymentComponent } from './employment/employment.component';
//Programms
import { PscComponent } from './Programms/ex-psc/ex-psc.component';
import { NormalPsdComponent } from './Programms/ex-psd/normal/normal.component';
import { PhpComponent } from './Programms/ex-psd/php/php.component';
import { SudComponent } from './Programms/ex-psd/sud/sud.component';
import { LolfComponent } from './Programms/lolf/lolf.component';
import { CsgclComponent } from './Programms/csgcl/csgcl.component';
import { StateComponent } from './Programms/state-budget/state-budget.component';
import { DistrictComponent } from './Programms/district-budget/district-budget.component';
import { FsehpComponent } from './Programms/ex-fonds/f.s.e.h.p/f.s.e.h.p.component';
import { FsdrsComponent } from './Programms/ex-fonds/f-s-d-r-s/f-s-d-r-s.component';
import { GrayAreaComponent } from './Programms/pcd/gray-area/gray-area.component';
import { Pcd23Component } from './Programms/pcd/pcd23/pcd23.component';
import { PecComponent } from './Programms/pcd/pec/pec.component';
//soc-economic
import { AgricultureComponent } from './soc-economic/agriculture/agriculture.component';
import { FishingComponent } from './soc-economic/fishing/fishing.component';
import { ForestsComponent } from './soc-economic/forests/forests.component';
import { HydraulicComponent } from './soc-economic/hydraulic/hydraulic.component';
import { ActivityComponent } from './soc-economic/industry/activity-zone/activity-zone.component';
import { IndustrialComponent } from './soc-economic/industry/industrial-zone/industrial-zone.component';
import { EnergyComponent } from './soc-economic/energy/energy.component';
import { CommerceComponent } from './soc-economic/commerce/commerce.component';
import { EnvironmentComponent } from './soc-economic/environment/environment.component';
import { PostTeleComponent } from './soc-economic/posts-telecom/posts-telecom.component';
import { RoadsComponent } from './soc-economic/roads/roads.component';
import { WorshipComponent } from './soc-economic/worship/worship.component';
import { CultureComponent } from './soc-economic/culture/culture.component';
import { MujahideenComponent } from './soc-economic/mujahideen/mujahideen.component';
import { HabitatComponent } from './soc-economic/habitat/habitat.component';
import { CraftsmanshipComponent } from './soc-economic/Tourism-craftsmanship/craftsmanship/craftsmanship.component';
import { TourismComponent } from './soc-economic/Tourism-craftsmanship/tourism/tourism.component';
import { SocialProtectionComponent } from './soc-economic/social-protection/social-protection.component';
import { PrimaryComponent } from './soc-economic/education/primary/primary.component';
import { MiddleComponent } from './soc-economic/education/middle/middle.component';
import { SecondaryComponent } from './soc-economic/education/secondary/secondary.component';
import { UniversitiesComponent } from './soc-economic/higher-education/universities/universities.component';
import { UniversityResidencesComponent } from './soc-economic/higher-education/university-residences/university-residences.component';
import { SchoolsNInstitutesComponent } from './soc-economic/higher-education/schools-n-institutes/schools-n-institutes.component';
import { UrbanNSuburbanComponent } from './soc-economic/transport/urban-n-suburban/urban-n-suburban.component';
import { RailwayNetworkComponent } from './soc-economic/transport/railway-network/railway-network.component';
import { PortsComponent } from './soc-economic/transport/ports/ports.component';
import { AirportsComponent } from './soc-economic/transport/airports/airports.component';
import { INSFPComponent } from './soc-economic/professional-training/insfp/insfp.component';
import { IEPComponent } from './soc-economic/professional-training/iep/iep.component';
import { CFPAComponent } from './soc-economic/professional-training/cfpa/cfpa.component';
import { BoardingschoolCapacityComponent } from './soc-economic/professional-training/boardingschool-capacity/boardingschool-capacity.component';
import { PublicInfrastructureComponent } from './soc-economic/health/public-infrastructure/public-infrastructure.component';
import { PrivateInfrastructureComponent } from './soc-economic/health/private-infrastructure/private-infrastructure.component';
import { MedicalEquipmentsComponent } from './soc-economic/health/medical-equipments/medical-equipments.component';
import { ParamedicsComponent } from './soc-economic/health/paramedics/paramedics.component';
import { RatiosComponent } from './soc-economic/health/ratios/ratios.component';
import { YouthComponent } from './soc-economic/youth-sports/youth/youth.component';
import { SportsComponent } from './soc-economic/youth-sports/sports/sports.component';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  //default path
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //paths
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'population', component: PopulationTableComponent, canActivate: [AuthGuard] },
  { path: 'GenData', component: GeneralDataComponent, canActivate: [AuthGuard] },
  { path: 'employment', component: EmploymentComponent, canActivate: [AuthGuard] },
  //programms paths
  { path: 'ex-psc', component: PscComponent, canActivate: [AuthGuard] },
  { path: 'normal', component: NormalPsdComponent, canActivate: [AuthGuard] },
  { path: 'php', component: PhpComponent, canActivate: [AuthGuard] },
  { path: 'sud', component: SudComponent, canActivate: [AuthGuard] },
  { path: 'lolf', component: LolfComponent, canActivate: [AuthGuard] },
  { path: 'csgcl', component: CsgclComponent, canActivate: [AuthGuard] },
  { path: 'state', component: StateComponent, canActivate: [AuthGuard] },
  { path: 'district', component: DistrictComponent, canActivate: [AuthGuard] },
  { path: 'fsehp', component: FsehpComponent, canActivate: [AuthGuard] },
  { path: 'fsdrs', component: FsdrsComponent, canActivate: [AuthGuard] },
  { path: 'grayarea', component: GrayAreaComponent, canActivate: [AuthGuard] },
  { path: 'pcd23', component: Pcd23Component, canActivate: [AuthGuard] },
  { path: 'pec', component: PecComponent, canActivate: [AuthGuard] },
  //Soc-economic paths
  { path: 'agriculture', component: AgricultureComponent, canActivate: [AuthGuard] },
  { path: 'fishing', component: FishingComponent, canActivate: [AuthGuard] },
  { path: 'forests', component: ForestsComponent, canActivate: [AuthGuard] },
  { path: 'hydraulic', component: HydraulicComponent, canActivate: [AuthGuard] },
  { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard] },
  { path: 'industrial', component: IndustrialComponent, canActivate: [AuthGuard] },
  { path: 'energy', component: EnergyComponent, canActivate: [AuthGuard] },
  { path: 'commerce', component: CommerceComponent, canActivate: [AuthGuard] },
  { path: 'environment', component: EnvironmentComponent, canActivate: [AuthGuard] },
  { path: 'PostTele', component: PostTeleComponent, canActivate: [AuthGuard] },
  { path: 'roads', component: RoadsComponent, canActivate: [AuthGuard] },
  { path: 'worship', component: WorshipComponent, canActivate: [AuthGuard] },
  { path: 'culture', component: CultureComponent, canActivate: [AuthGuard] },
  { path: 'mujahideen', component: MujahideenComponent, canActivate: [AuthGuard] },
  { path: 'habitat', component: HabitatComponent, canActivate: [AuthGuard] },
  { path: 'craftsmanship', component: CraftsmanshipComponent, canActivate: [AuthGuard] },
  { path: 'tourism', component: TourismComponent, canActivate: [AuthGuard] },
  { path: 'social-protection', component: SocialProtectionComponent, canActivate: [AuthGuard] },
  { path: 'primary', component: PrimaryComponent, canActivate: [AuthGuard] },
  { path: 'middle', component: MiddleComponent, canActivate: [AuthGuard] },
  { path: 'secondary', component: SecondaryComponent, canActivate: [AuthGuard] },
  { path: 'universities', component: UniversitiesComponent, canActivate: [AuthGuard] },
  { path: 'uniresidence', component: UniversityResidencesComponent, canActivate: [AuthGuard] },
  { path: 'school-institutes', component: SchoolsNInstitutesComponent, canActivate: [AuthGuard] },
  { path: 'urban', component: UrbanNSuburbanComponent, canActivate: [AuthGuard] },
  { path: 'railway', component: RailwayNetworkComponent, canActivate: [AuthGuard] },
  { path: 'ports', component: PortsComponent, canActivate: [AuthGuard] },
  { path: 'airports', component: AirportsComponent, canActivate: [AuthGuard] },
  { path: 'INSFP', component: INSFPComponent, canActivate: [AuthGuard] },
  { path: 'IEP', component: IEPComponent, canActivate: [AuthGuard] },
  { path: 'CFPA', component: CFPAComponent, canActivate: [AuthGuard] },
  { path: 'boarding', component: BoardingschoolCapacityComponent, canActivate: [AuthGuard] },
  { path: 'pubinfa', component: PublicInfrastructureComponent, canActivate: [AuthGuard] },
  { path: 'privinfa', component: PrivateInfrastructureComponent, canActivate: [AuthGuard] },
  { path: 'medequip', component: MedicalEquipmentsComponent, canActivate: [AuthGuard] },
  { path: 'paramedic', component: ParamedicsComponent, canActivate: [AuthGuard] },
  { path: 'ratio', component: RatiosComponent, canActivate: [AuthGuard] },
  { path: 'youth', component: YouthComponent, canActivate: [AuthGuard] },
  { path: 'sports', component: SportsComponent, canActivate: [AuthGuard] },
  // Catch all route - redirect to login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    SidebarComponent,
    MainComponent, 
    PopulationTableComponent, 
    GeneralDataComponent,
    EmploymentComponent,
    //programms
    LolfComponent,
    PscComponent,
    NormalPsdComponent,
    PhpComponent,
    SudComponent,
    CsgclComponent,
    DistrictComponent,
    StateComponent,
    FsehpComponent,
    FsdrsComponent,
    GrayAreaComponent,
    Pcd23Component,
    PecComponent,
   //soc-economic
    AgricultureComponent,
    FishingComponent,
    ForestsComponent,
    HydraulicComponent,
    ActivityComponent,
    IndustrialComponent,
    EnergyComponent,
    CommerceComponent,
    EnvironmentComponent,
    PostTeleComponent,
    RoadsComponent,
    WorshipComponent,
    CultureComponent,
    MujahideenComponent,
    HabitatComponent,
    CraftsmanshipComponent,
    TourismComponent,
    SocialProtectionComponent,
    PrimaryComponent,
    MiddleComponent,
    SecondaryComponent,
    UniversitiesComponent,
    UniversityResidencesComponent,
    SchoolsNInstitutesComponent,
    UrbanNSuburbanComponent,
    RailwayNetworkComponent,
    PortsComponent,
    AirportsComponent,
    INSFPComponent,
    IEPComponent,
    CFPAComponent,
    BoardingschoolCapacityComponent,
    PublicInfrastructureComponent,
    PrivateInfrastructureComponent,
    MedicalEquipmentsComponent,
    ParamedicsComponent,
    RatiosComponent,
    YouthComponent,
    SportsComponent,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
