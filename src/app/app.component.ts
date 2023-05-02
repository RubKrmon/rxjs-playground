import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Activity } from './model/activity.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  [x: string]: any;
  title = 'rxjs-playground';
  public enteredText: string = '';
  public activitiesList = new Array<Activity>();
  public boredUrl = 'https://www.boredapi.com/api/activity';

  constructor(private readonly http: HttpClient) {

  }

  public requestData(): void {
    this.http.get(this.boredUrl).subscribe({
      next: (data) => {
        const parsed: Activity = JSON.parse(JSON.stringify(data));
        this.activitiesList.push(parsed);
        this.enteredText = JSON.stringify(parsed);
      },
      complete: () => console.log('Completed')
    });
  }

  private formatJson(jsonText: string): string {
    try {
      const parsed: Activity = JSON.parse(jsonText);
      return JSON.stringify(parsed, null, 2); // Use 2 spaces to indent the JSON
    } catch (error) {
      console.error('Invalid JSON:', error);
      return jsonText; // Return the original JSON if it's invalid
    }
  }
}
