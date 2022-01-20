import { fabric } from 'fabric'
import { Place } from './Place.model'
import { Arc } from './Arc.model';

export class PetriNet {

  places: Array<Place> = [];
  transitions: Array<Arc> = [];

}
