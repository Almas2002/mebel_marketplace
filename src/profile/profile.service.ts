import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './profile.dto';
import { ProfileNotFoundException } from './profile.exception';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>) {
  }


  async update(dto: CreateProfileDto, userId: number) {
    const profile = await this.profileRepository.findOne({ where: { user: { id: userId } } });
    if (!profile) {
      throw new ProfileNotFoundException();
    }
    profile.firstName = dto?.firstName;
    profile.secondName = dto?.secondName;
    profile.email = dto?.email;
    profile.dayOfBirth = dto?.dayOfBirth;
    profile.yearOfBirth = dto?.yearOfBirth;
    profile.monthOfBirth = dto?.monthOfBirth;

    await this.profileRepository.save(profile);
  }

  async create(userId: number) {
    await this.profileRepository.save({ user: { id: userId } });
  }

  async get(userId: number) {
    return await this.profileRepository.findOne({ where: { user: { id: userId } } });
  }
}