import { Countries } from 'src/app/shared/models/countries';
import { State, Action, StateContext } from '@ngxs/store';
import { GetCountries } from '../action/countries.action';
import { CountriesService } from 'src/app/shared/services/countries.service';

export class CountriesModelState {
    countries: Countries[];
}

@State<CountriesModelState>({
    name: 'Countries',
    defaults: {
        countries: null
    }
})

export class CountriesState {

    constructor( private countriesService: CountriesService ) {}

    @Action(GetCountries)
    loginUser(ctx: StateContext<CountriesModelState>) {
        this.countriesService.getCountries().subscribe( res => {
            const countries = res;
            ctx.setState({ ...ctx, countries });
        });
    }
}
