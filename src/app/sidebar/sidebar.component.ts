import { Component, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: false,
})
export class SidebarComponent implements OnInit, OnDestroy {
  isSidebarClosed = true; 
  private clickListener: () => void = () => {}; 
  get isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    
    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      this.onClickOutside(event);
    });
  }

  ngOnDestroy() {
    
    if (this.clickListener) {
      this.clickListener();
    }
  }

  
  onClickOutside(event: Event) {
    const sidebar = this.el.nativeElement.querySelector('#sidebar');
    const toggleButton = this.el.nativeElement.querySelector('#toggle-button');

    
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
      this.isSidebarClosed = true;
      this.closeAllSubMenus();
    }
  }

  
  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
    if (this.isSidebarClosed) {
      this.closeAllSubMenus();
    }
  }

  
  toggleSubMenu(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownButton = target.closest('.dropdown');
    if (dropdownButton) {
      const subMenu = dropdownButton.nextElementSibling as HTMLElement;
      const rotIcon = dropdownButton.querySelector('.rot');
      
      if (subMenu && subMenu.classList.contains('sub')) {
        if (this.isSidebarClosed) {
          this.isSidebarClosed = false;
        }

        subMenu.classList.toggle('show');
        rotIcon?.classList.toggle('rotate');
      }
    }
  }

  
  closeAllSubMenus() {
    const subMenus = this.el.nativeElement.querySelectorAll('.sub');
    const rotIcons = this.el.nativeElement.querySelectorAll('.rot.rotate');
  
    subMenus.forEach((subMenu: HTMLElement) => {
      subMenu.classList.remove('show');
    });
    rotIcons.forEach((icon: HTMLElement) => {
      icon.classList.remove('rotate');
    });
  }

  GoToGenData() {
    this.router.navigate(['/GenData']);
  }
  GoToPopu() {
    this.router.navigate(['/population']);
  }
  GoToEmploy() {
    this.router.navigate(['/employment']);
  }
  GoToAdmin() {
    this.router.navigate(['/admin']);
  }
  //soc-economic Paths
  GoToIndus() {
    this.router.navigate(['/industrial']);
  }
  GoToActi() {
    this.router.navigate(['/activity']);
  }
  GoToHydraulic() {
    this.router.navigate(['/hydraulic']);
  }
  GoToAgri() {
    this.router.navigate(['/agriculture']);
  }
  GoToForests() {
    this.router.navigate(['/forests']);
  }
  GoToFishing() {
    this.router.navigate(['/fishing']);
  }
  GoToEnergy() {
    this.router.navigate(['/energy']);
  }
  GoToCommerce() {
  this.router.navigate(['/commerce']);
  }
  GoToEnvironment() {
  this.router.navigate(['/environment']);
  }
  GoToPostTele() {
  this.router.navigate(['/PostTele']);
  }
  GoToRoads() {
    this.router.navigate(['/roads']);
    }
  GoToWorship() {
  this.router.navigate(['/worship']);
  }
  GoToCulture() {
  this.router.navigate(['/culture']);
  } 
  GoToMujahideen() {
  this.router.navigate(['/mujahideen']);
  }
  GoToHabitat() {
  this.router.navigate(['/habitat']);
  }
  GoToCraftsmanship() {
  this.router.navigate(['/craftsmanship']);
  }
  GoToTourism() {
  this.router.navigate(['/tourism']);
  }
  GoToSocialProtection() {
  this.router.navigate(['/social-protection']);
  }
  GoToUrban() {
   this.router.navigate(['/urban']);
  }
  GoToRailway() {
      this.router.navigate(['/railway']);
  }
  GoToPorts() {
        this.router.navigate(['/ports']);
  }
  GoToAirports() {
          this.router.navigate(['/airports']);
  }
  GoToPrimary() {
    this.router.navigate(['/primary']);
  }
  GoToMiddle() {
  this.router.navigate(['/middle']);
  }
  GoToSecondary() {
  this.router.navigate(['/secondary']);
  }
  GoToUniversities() {
    this.router.navigate(['/universities']);
  }
  GoToSchoolnInstitutes() {
    this.router.navigate(['/school-institutes']);
  }
  GoToUniResidences() {
    this.router.navigate(['/uniresidence']);
  }
  GoToINSFP() {
    this.router.navigate(['/INSFP']);
  }
  GoToIEP() {
    this.router.navigate(['/IEP']);
  }
  GoToCFPA() {
    this.router.navigate(['/CFPA']);
  }
  GoToBoardingSchool() {
    this.router.navigate(['/boarding']);
  }
  GoToPublicInfrastructure() {
    this.router.navigate(['/pubinfa']);
  }
  GoToPrivateInfrastructure() {
    this.router.navigate(['/privinfa']);
  }
  GoToMedicalEquip() {
    this.router.navigate(['/medequip']);
  }
  GoToParamedic() {
    this.router.navigate(['/paramedic']);
  }
  GoToRatio() {
    this.router.navigate(['/ratio']);
  }
  GoToYouth() {
    this.router.navigate(['/youth']);
  }
  GoToSports() {
    this.router.navigate(['/sports']);
  }
  //Programms Paths
  GoToPsc() {
    this.router.navigate(['/ex-psc']);
  }
  GoToNormal() {
    this.router.navigate(['/normal']);
  }
  GoToPhp() {
    this.router.navigate(['/php']);
  }
  GoToSud() {
    this.router.navigate(['/sud']);
  }
  GoToLolf() {
    this.router.navigate(['/lolf']);
  }
  GoToCsgcl() {
    this.router.navigate(['/csgcl']);
  }
  GoToState() {
    this.router.navigate(['/state']);
  }
  GoToDistrict() {
    this.router.navigate(['/district']);
  }
  GoToFsehp() {
    this.router.navigate(['/fsehp']);
  }
  GoToFsdrs() {
    this.router.navigate(['/fsdrs']);
  }
  GoToGrayArea() {
    this.router.navigate(['/grayarea']);
  }
  GoToPcd23() {
    this.router.navigate(['/pcd23']);
  }
  GoToPec() {
    this.router.navigate(['/pec']);
  }
}