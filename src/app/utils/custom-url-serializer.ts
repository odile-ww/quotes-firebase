import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';

export class CustomSerializer implements UrlSerializer {
  parse(url: string): UrlTree {
    const dus = new DefaultUrlSerializer();

    return dus.parse(url);
  }

  serialize(tree: UrlTree): string {
    const dus = new DefaultUrlSerializer();
    const path = dus.serialize(tree);

    return path.replace(/%20/gi, '-');
  }
}
